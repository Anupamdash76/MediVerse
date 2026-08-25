import os
import asyncio
import smtplib
import logging
import httpx
from pathlib import Path
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

def _get_email_html(otp_code: str, user_name: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }}
            .card {{ max-width: 500px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); }}
            .logo {{ font-size: 24px; font-weight: bold; color: #38bdf8; text-align: center; margin-bottom: 24px; }}
            .otp-box {{ background: #0f172a; border: 2px dashed #0284c7; border-radius: 12px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; text-align: center; padding: 16px; margin: 24px 0; }}
            .footer {{ font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; }}
        </style>
    </head>
    <body>
        <div class="card">
            <div class="logo">MediVerse Smart Health</div>
            <h2>Password Reset Verification Code</h2>
            <p>Hello {user_name},</p>
            <p>We received a request to reset your MediVerse account password. Use the 6-digit verification code below to complete your password reset:</p>
            
            <div class="otp-box">{otp_code}</div>
            
            <p>This code will expire in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
            
            <div class="footer">
                &copy; 2026 MediVerse AI Health Platform. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    """

async def debug_smtp_connection(to_email: str = "b523008@iiit-bh.ac.in"):
    """
    Diagnostic helper for Brevo REST API status.
    """
    smtp_user = os.getenv("SMTP_USER", "").strip()
    brevo_key = os.getenv("BREVO_API_KEY", "").strip()

    info = {
        "smtp_user": smtp_user,
        "brevo_key_configured": bool(brevo_key),
        "brevo_key_prefix": brevo_key[:10] if brevo_key else "NONE",
    }

    if brevo_key and smtp_user:
        url = "https://api.brevo.com/v3/smtp/email"
        headers = {
            "accept": "application/json",
            "api-key": brevo_key,
            "content-type": "application/json"
        }
        for sender_email in [smtp_user]:
            payload = {
                "sender": {"name": "MediVerse Health", "email": sender_email},
                "to": [{"email": to_email}],
                "subject": "Diagnostic Brevo Test Code 112233",
                "htmlContent": "<p>Test</p>"
            }
            try:
                async with httpx.AsyncClient(timeout=10.0) as client:
                    r = await client.post(url, json=payload, headers=headers)
                    info[f"brevo_response_{sender_email}"] = f"{r.status_code}: {r.text}"
            except Exception as e:
                info[f"brevo_exception_{sender_email}"] = str(e)

    return info

async def _send_via_brevo_http(to_email: str, otp_code: str, user_name: str) -> bool:
    """
    1. Sends email via Brevo REST API over Port 443 (HTTPS) with sender auto-failover.
    """
    brevo_key = os.getenv("BREVO_API_KEY", "").strip().strip('"').strip("'")
    if not brevo_key:
        return False

    candidate_senders = []
    smtp_user = os.getenv("SMTP_USER", "").strip()
    if smtp_user:
        candidate_senders.append(smtp_user)

    url = "https://api.brevo.com/v3/smtp/email"
    headers = {
        "accept": "application/json",
        "api-key": brevo_key,
        "content-type": "application/json"
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        for sender_email in candidate_senders:
            payload = {
                "sender": {"name": "MediVerse Health", "email": sender_email},
                "to": [{"email": to_email}],
                "subject": f"{otp_code} is your MediVerse Password Reset Code",
                "htmlContent": _get_email_html(otp_code, user_name)
            }
            try:
                resp = await client.post(url, json=payload, headers=headers)
                if resp.status_code in (200, 201):
                    logger.info(f"[BREVO HTTP SUCCESS] OTP Email sent to {to_email} via sender {sender_email}")
                    return True
                else:
                    logger.warning(f"[BREVO HTTP FAILED] Sender {sender_email} status {resp.status_code}: {resp.text}")
            except Exception as e:
                logger.error(f"[BREVO HTTP ERROR] {e}")

    return False

async def _send_via_resend_http(to_email: str, otp_code: str, user_name: str) -> bool:
    """
    2. Sends email via Resend REST API over Port 443 (HTTPS).
    """
    resend_key = os.getenv("RESEND_API_KEY", "").strip().strip('"').strip("'")
    if not resend_key:
        return False

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {resend_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "from": "MediVerse Health <onboarding@resend.dev>",
        "to": [to_email],
        "subject": f"{otp_code} is your MediVerse Password Reset Code",
        "html": _get_email_html(otp_code, user_name)
    }

    try:
        async with httpx.AsyncClient(timeout=6.0) as client:
            resp = await client.post(url, json=payload, headers=headers)
            if resp.status_code in (200, 201):
                logger.info(f"[RESEND HTTP SUCCESS] OTP Email sent to {to_email}")
                return True
            else:
                logger.warning(f"[RESEND HTTP FAILED] Status {resp.status_code}: {resp.text}")
    except Exception as e:
        logger.error(f"[RESEND HTTP ERROR] {e}")
    return False

async def _send_via_nodemailer(to_email: str, otp_code: str, user_name: str) -> bool:
    """
    3. Executes Node.js Nodemailer script with strict 6s timeout limit.
    """
    script_path = Path(__file__).parent / "send_email_nodemailer.js"
    if not script_path.exists():
        return False

    try:
        proc = await asyncio.create_subprocess_exec(
            "node",
            str(script_path),
            to_email,
            otp_code,
            user_name,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            env=os.environ.copy()
        )
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=6.0)
        if proc.returncode == 0:
            logger.info(f"[NODEMAILER SUCCESS] {stdout.decode('utf-8', errors='ignore').strip()}")
            return True
        else:
            logger.warning(f"[NODEMAILER FAILED] Code {proc.returncode}: {stderr.decode('utf-8', errors='ignore').strip()}")
    except asyncio.TimeoutError:
        logger.warning("[NODEMAILER TIMEOUT] Subprocess execution exceeded 6s limit.")
        try:
            proc.kill()
        except Exception:
            pass
    except Exception as e:
        logger.error(f"Failed to invoke Nodemailer subprocess: {e}")
    return False

def _send_gmail_smtp_sync(smtp_host: str, smtp_port: int, smtp_user: str, smtp_password: str, to_email: str, msg_str: str) -> bool:
    """
    4. Fallback synchronous helper for Gmail SMTP.
    """
    ports_to_try = [smtp_port]
    if smtp_port == 587 and 465 not in ports_to_try:
        ports_to_try.append(465)
    elif smtp_port == 465 and 587 not in ports_to_try:
        ports_to_try.append(587)

    for port in ports_to_try:
        try:
            logger.info(f"Attempting Python Gmail SMTP to {smtp_host}:{port}...")
            if port == 465:
                with smtplib.SMTP_SSL(smtp_host, port, timeout=4) as server:
                    server.login(smtp_user, smtp_password)
                    server.sendmail(smtp_user, [to_email], msg_str)
            else:
                with smtplib.SMTP(smtp_host, port, timeout=4) as server:
                    server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.sendmail(smtp_user, [to_email], msg_str)
            
            logger.info(f"[PYTHON SMTP SUCCESS] OTP Email delivered to {to_email} via port {port}!")
            return True
        except Exception as e:
            logger.warning(f"Python SMTP failed on port {port}: {e}")
    return False

async def send_otp_email(to_email: str, otp_code: str, user_name: str = "Valued User") -> bool:
    """
    Multi-engine Email Dispatcher:
    1. Brevo HTTP REST API (Port 443 with sender failover)
    2. Resend HTTP REST API (Port 443)
    3. Nodemailer JS Subprocess (6s max)
    4. Python Gmail SMTP (4s max per port)
    5. Console Dev Fallback
    """
    # 1. Brevo HTTP REST API (Port 443)
    if await _send_via_brevo_http(to_email, otp_code, user_name):
        return True

    # 2. Resend HTTP REST API (Port 443)
    if await _send_via_resend_http(to_email, otp_code, user_name):
        return True

    # 3. Nodemailer JS Engine
    if await _send_via_nodemailer(to_email, otp_code, user_name):
        return True

    # 4. Python Gmail SMTP
    smtp_user = os.getenv("SMTP_USER", "").strip().strip('"').strip("'")
    smtp_password = os.getenv("SMTP_PASSWORD", "").strip().strip('"').strip("'").replace(" ", "")

    if smtp_user and smtp_password:
        smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip().strip('"').strip("'")
        try:
            smtp_port = int(os.getenv("SMTP_PORT", "587").strip().strip('"').strip("'"))
        except ValueError:
            smtp_port = 587

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"{otp_code} is your MediVerse Password Reset Code"
        msg["From"] = f"MediVerse Health <{smtp_user}>"
        msg["To"] = to_email
        msg.attach(MIMEText(_get_email_html(otp_code, user_name), "html"))

        if await asyncio.to_thread(_send_gmail_smtp_sync, smtp_host, smtp_port, smtp_user, smtp_password, to_email, msg.as_string()):
            return True

    # 5. Console Fallback
    logger.warning(f"[EMAIL DEV MODE] All network email dispatchers unfulfilled. OTP for {to_email}: {otp_code}")
    print(f"\n==========================================")
    print(f"[MEDIVERSE OTP CODE FOR {to_email}]: {otp_code}")
    print(f"==========================================\n")
    return True

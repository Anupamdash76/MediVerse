const nodemailer = require('nodemailer');

async function main() {
  const toEmail = process.argv[2];
  const otpCode = process.argv[3];
  const userName = process.argv[4] || "Valued User";

  const smtpUser = (process.env.SMTP_USER || "").trim();
  const smtpPassword = (process.env.SMTP_PASSWORD || "").trim().replace(/\s+/g, "");

  if (!toEmail || !otpCode) {
    console.error("Usage: node send_email_nodemailer.js <to_email> <otp_code> [user_name]");
    process.exit(1);
  }

  if (!smtpUser || !smtpPassword) {
    console.log(`[EMAIL DEV MODE] SMTP credentials missing. OTP for ${toEmail}: ${otpCode}`);
    process.exit(0);
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 20px; }
          .card { max-width: 500px; margin: 0 auto; background: #1e293b; border-radius: 16px; border: 1px solid #334155; padding: 32px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); }
          .logo { font-size: 24px; font-weight: bold; color: #38bdf8; text-align: center; margin-bottom: 24px; }
          .otp-box { background: #0f172a; border: 2px dashed #0284c7; border-radius: 12px; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #38bdf8; text-align: center; padding: 16px; margin: 24px 0; }
          .footer { font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px; }
      </style>
  </head>
  <body>
      <div class="card">
          <div class="logo">MediVerse Smart Health</div>
          <h2>Password Reset Verification Code</h2>
          <p>Hello ${userName},</p>
          <p>We received a request to reset your MediVerse account password. Use the 6-digit verification code below to complete your password reset:</p>
          
          <div class="otp-box">${otpCode}</div>
          
          <p>This code will expire in <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
          
          <div class="footer">
              &copy; 2026 MediVerse AI Health Platform. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const mailOptions = {
    from: `MediVerse Health <${smtpUser}>`,
    to: toEmail,
    subject: `${otpCode} is your MediVerse Password Reset Code`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[NODEMAILER SUCCESS] OTP Email sent to ${toEmail}. Message ID: ${info.messageId}`);
    process.exit(0);
  } catch (err) {
    console.error(`[NODEMAILER ERROR] Failed to send email:`, err.message || err);
    process.exit(1);
  }
}

main();

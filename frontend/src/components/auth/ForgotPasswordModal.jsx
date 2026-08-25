import { useState } from "react";
import { X, Mail, KeyRound, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPassword, verifyOTP, resetPassword } from "../../services/authService";

export default function ForgotPasswordModal({ isOpen, onClose, initialEmail = "", onSuccessLogin }) {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) return setError("Please enter your registered email address.");

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "Verification code sent to your email!");
      setTimeout(() => {
        setStep(2);
      }, 600);
    } catch (err) {
      const errMsg = err.response?.data?.detail || (err.code === "ECONNABORTED" ? "Server took too long to respond. Please try again." : "Failed to send verification code.");
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!otp || otp.length !== 6) return setError("Please enter a valid 6-digit verification code.");

    setLoading(true);
    try {
      const res = await verifyOTP(email, otp);
      setMessage(res.message || "Code verified successfully!");
      setTimeout(() => {
        setStep(3);
      }, 600);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Invalid or expired verification code.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword || newPassword.length < 8) {
      return setError("Password must be at least 8 characters long.");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword);
      setMessage(res.message || "Password reset successfully!");
      setTimeout(() => {
        onClose();
        if (onSuccessLogin) onSuccessLogin(email);
      }, 1500);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Password reset failed. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20">
            <KeyRound size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white">Reset Password</h2>
          <p className="mt-1 text-sm text-slate-400">
            {step === 1 && "Enter your email to receive a 6-digit verification code"}
            {step === 2 && `Enter the code sent to ${email}`}
            {step === 3 && "Create a new strong password for your account"}
          </p>
        </div>

        {/* Banners */}
        {error && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 shadow-lg shadow-blue-600/30"
            >
              {loading ? "Sending Code..." : "Send Verification Code"}
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="mt-6 space-y-4">
            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">6-Digit Verification Code</label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-center text-2xl font-bold tracking-widest text-cyan-400 placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 shadow-lg shadow-blue-600/30"
            >
              {loading ? "Verifying..." : "Verify Code"}
              <ArrowRight size={18} />
            </button>

            <div className="flex justify-between text-xs text-slate-400 pt-2">
              <button type="button" onClick={() => setStep(1)} className="hover:text-white underline">Change Email</button>
              <button type="button" onClick={handleSendOTP} className="hover:text-cyan-400 underline">Resend Code</button>
            </div>
          </form>
        )}

        {/* STEP 3: Set New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Min 8 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 shadow-lg shadow-emerald-600/30"
            >
              {loading ? "Resetting Password..." : "Reset Password & Log In"}
              <CheckCircle2 size={18} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

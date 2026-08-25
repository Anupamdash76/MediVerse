import { useState } from "react";
import { X, Mail, KeyRound, Lock, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
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
      const errMsg =
        err.response?.data?.detail ||
        (err.code === "ECONNABORTED"
          ? "Server took too long to respond. Please try again."
          : "Failed to send verification code.");
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
    <>
      {/* Dim Ambient Glass Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Top Floating Reset Password Sheet Card */}
      <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] transition-all duration-300 animate-in fade-in slide-in-from-top-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Step Indicator Pills */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? "w-8 bg-blue-600" : "w-2 bg-slate-200"}`} />
        </div>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            {step === 3 ? <ShieldCheck size={28} /> : <KeyRound size={28} />}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reset Password</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 font-medium">
            {step === 1 && "Enter your registered email to receive a 6-digit code."}
            {step === 2 && `Enter the 6-digit code sent to ${email}`}
            {step === 3 && "Create a new secure password for your account."}
          </p>
        </div>

        {/* Banners */}
        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm text-red-700 font-medium">
            <AlertCircle size={18} className="shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs sm:text-sm text-emerald-700 font-medium">
            <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        )}

        {/* STEP 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="mt-6 space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-500/20 cursor-pointer"
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
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 text-center text-2xl font-bold tracking-widest text-blue-600 placeholder-slate-300 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-md shadow-blue-500/20 cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify Code"}
              <ArrowRight size={18} />
            </button>

            <div className="flex justify-between text-xs text-slate-500 font-medium pt-2">
              <button type="button" onClick={() => setStep(1)} className="hover:text-slate-900 underline cursor-pointer">
                Change Email
              </button>
              <button type="button" onClick={handleSendOTP} className="hover:text-blue-600 underline cursor-pointer">
                Resend Code
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Set New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Min 8 characters"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition font-medium"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition font-medium"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              {loading ? "Resetting Password..." : "Reset Password & Log In"}
              <CheckCircle2 size={18} />
            </button>
          </form>
        )}

      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, User, Mail, Lock, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { register as registerUser } from "../../services/authService";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) {
      setError("");
      setIsDuplicateEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsDuplicateEmail(false);
    setLoading(true);

    try {
      const response = await registerUser(form);
      login(response.user, response.access_token);
      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail || "Registration failed.";
      setError(detail);
      if (detail.toLowerCase().includes("already registered")) {
        setIsDuplicateEmail(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-6">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-sm text-slate-400">Join MediVerse to unlock AI-powered diagnostics</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-6 flex flex-col gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>

            {isDuplicateEmail && (
              <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-red-500/20">
                <p className="text-xs text-slate-300">Would you like to log in or reset your password for this email?</p>
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 rounded-lg bg-blue-600/80 py-1.5 text-center text-xs font-semibold text-white hover:bg-blue-600"
                  >
                    Go to Login
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsForgotOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-slate-700"
                  >
                    <KeyRound size={14} />
                    Forgot Password?
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={18} />
              <input
                name="password"
                type="password"
                required
                placeholder="Min 8 characters"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-3 pl-11 pr-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 shadow-lg shadow-cyan-500/30"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-cyan-400 hover:text-cyan-300 underline">
            Log in here
          </Link>
        </p>

      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        initialEmail={form.email}
        onSuccessLogin={() => navigate("/login")}
      />

    </div>
  );
}
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { login as loginUser } from "../../services/authService";
import ForgotPasswordModal from "../../components/auth/ForgotPasswordModal";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      login(response.user, response.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans text-slate-900">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
        
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition mb-6">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Portal Sign In</h1>
          <p className="mt-1 text-xs text-slate-500">Access your MediVerse health records and diagnostic dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            <AlertCircle size={16} className="shrink-0" />
            <div className="flex-1">
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" autoComplete="off">
          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="email"
                required
                autoComplete="off"
                placeholder="abc@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
              <button
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-xs font-medium text-blue-600 hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-sm text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-sm cursor-pointer"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Register here
          </Link>
        </p>

      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        initialEmail={email}
        onSuccessLogin={(resetEmail) => {
          setEmail(resetEmail);
        }}
      />

    </div>
  );
}
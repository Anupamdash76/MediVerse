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
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Patient Account</h1>
          <p className="mt-1 text-xs text-slate-500">Join MediVerse to unlock clinical AI symptom screening</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-5 flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>

            {isDuplicateEmail && (
              <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-red-200">
                <p className="text-xs text-slate-600">Already registered? Log in or reset your password below.</p>
                <div className="flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 rounded-lg bg-blue-600 py-1.5 text-center text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Go to Sign In
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsForgotOpen(true)}
                    className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
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
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={form.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
              <input
                name="password"
                type="password"
                required
                placeholder="Min 8 characters"
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-sm text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-sm cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Sign in here
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { register as registerUser } from "../../services/authService";

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

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await registerUser(form);

      login(
        response.user,
        response.access_token,
      );

      navigate("/dashboard");

    }

    catch (err) {

      setError(
        err.response?.data?.detail ||
        "Registration failed."
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border p-8 shadow"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border rounded-lg p-3"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          value={form.password}
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-600 py-3 text-white"
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

      </form>

    </div>

  );

}
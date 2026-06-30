import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { login as loginUser } from "../../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const response = await loginUser({

        email,

        password,

      });

      login(
        response.user,
        response.access_token,
      );

      navigate("/dashboard");

    }

    catch (err) {

      setError(

        err.response?.data?.detail ||

        "Login failed."

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
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {

          error &&

          <p className="text-red-500">
            {error}
          </p>

        }

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 text-white py-3"
        >

          {

            loading

              ? "Logging in..."

              : "Login"

          }

        </button>

      </form>

    </div>

  );

}
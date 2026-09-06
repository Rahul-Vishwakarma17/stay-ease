

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const response = await login(email, password);

    const { user } = response;

    if (user.role === "host") {
      navigate("/host");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    console.error("Login error:", error);

    setError(
      error.response?.data?.message ||
        "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#faf9f7] px-6 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* =========================
            Left Side
        ========================= */}

        <div className="hidden bg-orange-500 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold"
            >
              Stay<span className="text-orange-100">
                Ease
              </span>
            </Link>

            <div className="mt-20">

              <h1 className="text-4xl font-extrabold leading-tight">
                Your next
                <br />
                adventure starts here.
              </h1>

              <p className="mt-5 max-w-md leading-7 text-orange-50">
                Discover beautiful properties, book
                unforgettable stays, and find your
                perfect home away from home.
              </p>

            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm leading-6 text-orange-50">
              "A great place to stay can turn a good
              trip into an unforgettable one."
            </p>
          </div>

        </div>

        {/* =========================
            Login Form
        ========================= */}

        <div className="p-7 sm:p-10 lg:p-12">

          <div className="mx-auto max-w-md">

            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl lg:hidden">
                🏡
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Welcome back
              </h2>

              <p className="mt-2 text-gray-500">
                Login to continue your StayEase journey.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            {/* Register */}

            <p className="mt-7 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-orange-500 hover:text-orange-600"
              >
                Create one
              </Link>
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;
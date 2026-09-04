
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("guest");
//   const [error, setError] = useState("");

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       // Register user
//       await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role,
//         }),
//       }).then(async (response) => {
//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Registration failed");
//         }
//       });

//       // Login automatically after registration
//       await login(email, password);

//       navigate(
//         role === "host" ? "/host" : "/dashboard"
//       );
//     } catch (error) {
//       setError(error.message || "Registration failed");
//     }
//   };

//   return (
//     <main>
//       <h1>Create Account</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>

//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Email</label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Password</label>

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Account Type</label>

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="guest">Guest</option>
//             <option value="host">Host</option>
//           </select>
//         </div>

//         {error && <p>{error}</p>}

//         <button type="submit">
//           Create Account
//         </button>
//       </form>
//     </main>
//   );
// }

// export default Register;




// Flow
// Register form
//      ↓
// name + email + password + role
//      ↓
// POST /api/auth/register
//      ↓
// User created in MongoDB
//      ↓
// Automatically login
//      ↓
// JWT stored
//      ↓
// Guest → /dashboard
// Host  → /host
// One thing we're intentionally doing

// We let the user choose:

// Guest
// Host

// because our StayEase design allows a user to be either role.


// aftyer css 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("guest");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed"
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
                Find your place.
                <br />
                Make it yours.
              </h1>

              <p className="mt-5 max-w-md leading-7 text-orange-50">
                Join StayEase and discover amazing
                places to stay — or become a host and
                share your own property.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-white/10 p-4 text-center">
              <div className="text-xl">🏡</div>
              <p className="mt-1 text-xs text-orange-50">
                Great stays
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4 text-center">
              <div className="text-xl">🔒</div>
              <p className="mt-1 text-xs text-orange-50">
                Secure
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-4 text-center">
              <div className="text-xl">⭐</div>
              <p className="mt-1 text-xs text-orange-50">
                Trusted
              </p>
            </div>

          </div>

        </div>

        {/* =========================
            Register Form
        ========================= */}

        <div className="p-7 sm:p-10 lg:p-12">

          <div className="mx-auto max-w-md">

            <div className="mb-8">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl lg:hidden">
                🏡
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Create your account
              </h2>

              <p className="mt-2 text-gray-500">
                Start your StayEase journey today.
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

              {/* Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

                <p className="mt-1.5 text-xs text-gray-400">
                  Minimum 6 characters
                </p>
              </div>

              {/* Role */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  I want to
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* Guest */}

                  <button
                    type="button"
                    onClick={() => setRole("guest")}
                    className={`rounded-xl border p-4 text-left transition ${
                      role === "guest"
                        ? "border-orange-400 bg-orange-50 ring-2 ring-orange-100"
                        : "border-gray-200 bg-gray-50 hover:border-orange-200"
                    }`}
                  >
                    <div className="text-xl">
                      🧳
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      Stay as a guest
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Find and book properties
                    </p>
                  </button>

                  {/* Host */}

                  <button
                    type="button"
                    onClick={() => setRole("host")}
                    className={`rounded-xl border p-4 text-left transition ${
                      role === "host"
                        ? "border-orange-400 bg-orange-50 ring-2 ring-orange-100"
                        : "border-gray-200 bg-gray-50 hover:border-orange-200"
                    }`}
                  >
                    <div className="text-xl">
                      🏠
                    </div>

                    <p className="mt-2 text-sm font-bold text-gray-800">
                      Become a host
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      List and manage properties
                    </p>
                  </button>

                </div>

              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create Account"}
              </button>

            </form>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-orange-500 hover:text-orange-600"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;
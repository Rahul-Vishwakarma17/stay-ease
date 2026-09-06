
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-orange-600 bg-orange-50"
        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white shadow-md shadow-orange-200">
            S
          </div>

          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            Stay<span className="text-orange-500">Ease</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/properties"
            className={navLinkClass}
          >
            Properties
          </NavLink>

          {user && (
            <NavLink
              to={
                user.role === "host"
                  ? "/host"
                  : "/dashboard"
              }
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {user ? (
            <>
              {/* User */}
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {user.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div className="hidden leading-tight lg:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-xs capitalize text-gray-400">
                    {user.role}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={logout}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
              >
                Get Started
              </Link>
            </>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Music", path: "/music" },
  { name: "Film & Documentaries", path: "/film" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Eye-Zo Studios"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition ${
                  isActive
                    ? "text-brand-gold"
                    : "text-brand-cream hover:text-brand-gold"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm text-white/60 sm:block">
                {user?.email}
              </span>

              <button
                onClick={logout}
                className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:hidden">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm ${
                isActive
                  ? "border-brand-gold text-brand-gold"
                  : "border-white/15 text-brand-cream"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
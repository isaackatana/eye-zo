import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { UserCircle2 } from "lucide-react";

import logo from "../assets/logo.png";

import { useAuth } from "../context/AuthContext";

const publicLinks = [
  { name: "Home", path: "/" },
  { name: "Music", path: "/music" },
  { name: "Film & Documentaries", path: "/film" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
];

export default function Header() {
  const location = useLocation();

  const { user, isLoggedIn, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Eye-Zo Studios"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden gap-6 md:flex">
          {publicLinks.map((link) => {
            const isActive =
              location.pathname === link.path;

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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div
              className="relative"
              ref={menuRef}
            >
              {/* PROFILE BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 transition hover:border-brand-gold"
              >
                <UserCircle2
                  size={22}
                  className="text-brand-gold"
                />

                <span className="hidden max-w-[140px] truncate text-sm text-white/70 lg:block">
                  {user?.email}
                </span>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
                  {/* USER INFO */}
                  <div className="border-b border-white/10 p-5">
                    <p className="text-xs uppercase tracking-widest text-brand-gold">
                      Logged In
                    </p>

                    <p className="mt-2 truncate text-sm text-white/70">
                      {user?.email}
                    </p>
                  </div>

                  {/* MENU */}
                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      onClick={() =>
                        setOpen(false)
                      }
                      className="block rounded-2xl px-4 py-3 text-sm transition hover:bg-white/10"
                    >
                      Dashboard
                    </Link>

                    <button className="block w-full rounded-2xl px-4 py-3 text-left text-sm transition hover:bg-white/10">
                      Plan
                    </button>

                    <button className="block w-full rounded-2xl px-4 py-3 text-left text-sm transition hover:bg-white/10">
                      Settings
                    </button>

                    <div className="my-2 border-t border-white/10" />

                    <button
                      onClick={logout}
                      className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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

      {/* MOBILE NAV */}
      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:hidden">
        {publicLinks.map((link) => {
          const isActive =
            location.pathname === link.path;

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
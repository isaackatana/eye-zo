import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import CartIcon from "./CartIcon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-black/90 text-white dark:bg-gray-900 shadow-md backdrop-blur sticky top-0 z-40">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                <img src="/logo.png" className="h-8 w-8 object-contain" alt="EyeZo Logo" />
                <span>EyeZo</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 font-medium">
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/music" className="hover:text-blue-400 transition">Music</Link>
              <Link to="/film" className="hover:text-blue-400 transition">Film</Link>
              <Link to="/documentaries" className="hover:text-blue-400 transition">Documentaries</Link>
              <Link to="/shop" className="hover:text-blue-400 transition">Shop</Link>
              <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">

              <Link
                to="/login"
                className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-800 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Sign Up
              </Link>

              <CartIcon />

              <ThemeSwitch />

            </div>

            {/* Mobile Controls */}
            <div className="md:hidden flex items-center gap-3">
              <CartIcon />
              <ThemeSwitch />

              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-md hover:bg-gray-800 transition"
              >
                ☰
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >

        {/* Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sliding Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-64 bg-black text-white shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >

          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <span className="font-semibold text-lg">Menu</span>
            <button onClick={() => setMenuOpen(false)}>✖</button>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col p-4 space-y-3">

            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Home</Link>
            <Link to="/music" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Music</Link>
            <Link to="/film" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Film</Link>
            <Link to="/documentaries" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Documentaries</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Shop</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">About</Link>

            <div className="border-t border-gray-700 pt-4 flex flex-col gap-2">

              <Link
                to="/login"
                className="px-3 py-2 border border-gray-600 rounded text-center hover:bg-gray-800"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-3 py-2 rounded bg-blue-600 text-center hover:bg-blue-700"
              >
                Sign Up
              </Link>

            </div>

          </nav>

        </div>
      </div>
    </>
  );
}
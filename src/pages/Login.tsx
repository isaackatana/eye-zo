import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/music");
    } catch {
      setError("Could not log in. Check your email and password.");
    }
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl border border-white/10 bg-white/5 p-6"
      >
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-brand-gold">
          Welcome back
        </p>
        <h1 className="mb-6 text-3xl font-bold">Login</h1>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-brand-gold"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-5 w-full rounded-full border border-white/10 bg-black px-4 py-3 outline-none focus:border-brand-gold"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button className="w-full rounded-full bg-brand-gold px-5 py-3 font-bold text-black">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-white/60">
          No account?{" "}
          <Link to="/signup" className="text-brand-gold">
            Sign up
          </Link>
        </p>
      </form>
    </section>
  );
}
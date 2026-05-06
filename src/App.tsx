import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Music from "./pages/Music";
import Film from "./pages/Film";
import Shop from "./pages/Shop";
import About from "./pages/About";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-black text-brand-cream">
      <Header />

      <main className="flex-1 pb-72">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/film" element={<Film />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
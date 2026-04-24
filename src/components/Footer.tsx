export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/70 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Eye Zo LLC. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-brand-gold">Instagram</a>
          <a href="#" className="hover:text-brand-gold">YouTube</a>
          <a href="#" className="hover:text-brand-gold">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
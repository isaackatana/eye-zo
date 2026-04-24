export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-10 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-brand-gold">
            Creative Studio • Music • Film • Culture
          </p>
          <h1 className="mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Stories in sound, vision, and style.
          </h1>
          <p className="mb-8 max-w-xl text-lg text-white/75">
            Eye-Zo Studios is a modern creative platform for music, film, documentaries,
            visual storytelling, and curated products.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/music"
              className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-black"
            >
              Explore Music
            </a>
            <a
              href="/film"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-brand-cream"
            >
              Watch Films
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-gold/20 via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
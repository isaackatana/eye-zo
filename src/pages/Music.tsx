const songs = [
  { title: "Midnight Echo", artist: "Eye Zo", type: "Afro Fusion" },
  { title: "Coastline Dreams", artist: "Eye Zo", type: "Ambient" },
  { title: "Fire in Motion", artist: "Eye Zo", type: "Visual EP" },
];

export default function Music() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">Music</p>
        <h1 className="text-4xl font-bold">Latest releases</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {songs.map((song) => (
          <article
            key={song.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur"
          >
            <div className="mb-4 aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-brand-gold/20" />
            <p className="text-sm uppercase tracking-widest text-brand-gold">{song.type}</p>
            <h2 className="mt-2 text-2xl font-bold">{song.title}</h2>
            <p className="mt-0 text-white/70">{song.artist}</p>
            <button className="mt-2 rounded-full bg-brand-gold px-5 py-2 font-semibold text-black">
              Preview
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
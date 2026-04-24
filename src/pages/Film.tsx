const projects = [
  {
    title: "Silent Roads",
    category: "Documentary",
    description: "A visual journey through memory, migration, and belonging.",
  },
  {
    title: "The Last Frame",
    category: "Short Film",
    description: "A cinematic story told through movement, silence, and contrast.",
  },
];

export default function Film() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
        Film & Documentaries
      </p>
      <h1 className="mb-5 text-4xl font-bold">Visual stories</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="aspect-video bg-gradient-to-br from-brand-gold/20 via-white/10 to-black" />
            <div className="p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-brand-gold">
                {project.category}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
              <p className="mt-3 text-white/70">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
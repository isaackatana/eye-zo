const items = [
  { name: "Studio Tee", price: "$35" },
  { name: "Visual Notes Poster", price: "$20" },
  { name: "Collector Cap", price: "$28" },
];

export default function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">Shop</p>
      <h1 className="mb-5 text-4xl font-bold">Curated pieces</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="mb-5 aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-brand-gold/20" />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="mt-2 text-brand-gold">{item.price}</p>
            <button className="mt-5 rounded-full border border-white/20 px-4 py-2 hover:border-brand-gold hover:text-brand-gold">
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
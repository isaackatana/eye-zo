import { useState } from "react";

const musicData = [
  {
    id: 1,
    title: "Midnight Beats",
    artist: "DJ Nova",
    cover: "/music/music1.jpg",
  },
  {
    id: 2,
    title: "Urban Waves",
    artist: "The Flow",
    cover: "/music/music2.jpg",
  },
  {
    id: 3,
    title: "Echo Sound",
    artist: "Luna Vox",
    cover: "/music/music3.jpg",
  },
  {
    id: 4,
    title: "Deep Rhythm",
    artist: "Night Pulse",
    cover: "/music/music4.jpg",
  },
];

export default function Music() {
  const [music] = useState(musicData);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Music</h1>
        <p className="text-gray-400 max-w-xl">
          Discover new music, explore independent artists, and enjoy exclusive
          releases from EyeZo creators.
        </p>
      </section>

      {/* Music Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-semibold mb-6">Featured Releases</h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {music.map((track) => (
            <div
              key={track.id}
              className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition transform cursor-pointer"
            >

              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{track.title}</h3>
                <p className="text-gray-400 text-sm">{track.artist}</p>

                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded">
                  ▶ Play
                </button>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}
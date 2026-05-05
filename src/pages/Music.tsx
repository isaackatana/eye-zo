import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { songs, type Song } from "../data/songs";

export default function Music() {
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pb-80 pt-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
          Music
        </p>

        <h1 className="text-4xl font-bold">Latest releases</h1>

        <p className="mt-3 max-w-2xl text-white/60">
          Stream previews, switch between audio and video, shuffle releases, and
          share your favorite Eye Zo tracks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {songs.map((song) => (
          <article
            key={song.id}
            onClick={() => playSong(song)}
            className={`cursor-pointer rounded-3xl border p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10 ${
              currentSong.id === song.id
                ? "border-brand-gold bg-brand-gold/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="mb-4 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-brand-gold/30">
              <span className="text-5xl">♪</span>
            </div>

            <p className="text-sm uppercase tracking-widest text-brand-gold">
              {song.type}
            </p>

            <h2 className="mt-1 text-2xl font-bold">{song.title}</h2>
            <p className="text-white/70">{song.artist}</p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                playSong(song);
              }}
              className="mt-5 rounded-full bg-brand-gold px-5 py-2 font-semibold text-black transition hover:scale-105"
            >
              Preview
            </button>
          </article>
        ))}
      </div>

      <MusicPlayer
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </section>
  );
}
import type { Song } from "../pages/Music";

type SongCardProps = {
  song: Song;
  onPlay: () => void;
};

export default function SongCard({ song, onPlay }: SongCardProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group w-full text-left bg-neutral-950 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-1 transition-all"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Preview</p>
        <h3 className="text-lg font-semibold text-white">{song.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{song.artist}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-blue-400">Play now</span>
          <span className="text-xl">▶</span>
        </div>
      </div>
    </button>
  );
}
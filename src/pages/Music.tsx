import { useMemo, useState } from "react";
import SongCard from "../components/SongCard";
import MusicPlayer from "../components/MusicPlayer";

export type Song = {
  id: number;
  title: string;
  artist: string;
  preview: string;
  full: string;
  video: string;
  cover: string;
};

const songs: Song[] = [
  {
    id: 1,
    title: "Night Drive",
    artist: "EyeZo Studios",
    preview: "/audio/night-drive-preview.mp3",
    full: "/audio/night-drive.mp3",
    video: "/video/night-drive.mp4",
    cover: "/covers/night-drive.jpg",
  },
  {
    id: 2,
    title: "City Lights",
    artist: "EyeZo Studios",
    preview: "/audio/city-lights-preview.mp3",
    full: "/audio/city-lights.mp3",
    video: "/video/city-lights.mp4",
    cover: "/covers/city-lights.jpg",
  },
  {
    id: 3,
    title: "Ocean Echo",
    artist: "EyeZo Studios",
    preview: "/audio/ocean-echo-preview.mp3",
    full: "/audio/ocean-echo.mp3",
    video: "/video/ocean-echo.mp4",
    cover: "/covers/ocean-echo.jpg",
  },
  {
    id: 4,
    title: "Midnight Signal",
    artist: "EyeZo Studios",
    preview: "/audio/midnight-signal-preview.mp3",
    full: "/audio/midnight-signal.mp3",
    video: "/video/midnight-signal.mp4",
    cover: "/covers/midnight-signal.jpg",
  },
];

export default function Music() {
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);

  const currentIndex = useMemo(
    () => songs.findIndex((song) => song.id === currentSongId),
    [currentSongId]
  );

  const currentSong = currentIndex >= 0 ? songs[currentIndex] : null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Listen</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">Music</h1>
        <p className="text-gray-400 mt-3 max-w-2xl">
          Explore featured tracks, switch between audio and video previews, and unlock full playback after login.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pb-36">
        {songs.map((song) => (
          <div
            key={song.id}
            className={song.id === currentSongId ? "ring-2 ring-blue-500 rounded-2xl" : ""}
          >
            <SongCard song={song} onPlay={() => setCurrentSongId(song.id)} />
          </div>
        ))}
      </div>

      {currentSong && (
        <MusicPlayer
          song={currentSong}
          songs={songs}
          currentIndex={currentIndex}
          onSelectSong={(index) => setCurrentSongId(songs[index].id)}
        />
      )}
    </section>
  );
}
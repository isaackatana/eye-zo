import { useEffect, useRef, useState } from "react";
import { songs, type Song } from "../data/songs";

type MusicPlayerProps = {
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MusicPlayer({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [mediaMode, setMediaMode] = useState<"audio" | "video">("audio");
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const previewLimit = 30;

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();
    setCurrentTime(0);
    setDuration(0);

    if (isPlaying && mediaMode === "audio") {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong, mediaMode, isPlaying, setIsPlaying]);

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.play().then(() => setIsPlaying(true));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);

    if (!isLoggedIn && audioRef.current.currentTime >= previewLimit) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      alert("Preview ended. Please log in to play the full song.");
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const nextTime = Number(event.target.value);

    if (!isLoggedIn && nextTime > previewLimit) {
      audioRef.current.currentTime = previewLimit;
      setCurrentTime(previewLimit);
      return;
    }

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const playNext = () => {
    if (isShuffle) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      setCurrentSong(randomSong);
      setIsPlaying(true);
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];

    setCurrentSong(nextSong);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];

    setCurrentSong(previousSong);
    setIsPlaying(true);
  };

  const shareSong = async () => {
    const shareData = {
      title: currentSong.title,
      text: `Listen to ${currentSong.title} by ${currentSong.artist}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    alert("Song link copied.");
  };

  const progressMax = isLoggedIn
    ? duration || 0
    : Math.min(duration || previewLimit, previewLimit);

  const progressPercent =
    progressMax > 0 ? Math.min((currentTime / progressMax) * 100, 100) : 0;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] border-t border-white/10 bg-black/90 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-[78%]"
      }`}
    >
      <button
        onClick={() => setIsOpen((value) => !value)}
        className="mx-auto block rounded-t-full bg-brand-gold px-6 py-1 text-xs font-bold text-black"
      >
        {isOpen ? "Hide Player" : "Open Player"}
      </button>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold/80 to-white/10 shadow-lg">
              <span className="text-3xl text-black">♪</span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">
                Now Playing
              </p>
              <h3 className="mt-1 text-xl font-bold">{currentSong.title}</h3>
              <p className="text-sm text-white/60">{currentSong.artist}</p>
              <p className="text-xs text-white/40">{currentSong.type}</p>
            </div>
          </div>

          <div>
            {mediaMode === "video" ? (
              <video
                className="max-h-52 w-full rounded-3xl border border-white/10 bg-black object-cover shadow-xl"
                src={currentSong.videoUrl}
                controls
              />
            ) : (
              <>
                <audio
                  ref={audioRef}
                  src={currentSong.audioUrl}
                  onLoadedMetadata={handleLoadedMetadata}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={playNext}
                />

                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-inner">
                  <div className="relative mb-3 h-2 rounded-full bg-white/10">
                    <div
                      className="absolute left-0 top-0 h-2 rounded-full bg-brand-gold"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={progressMax}
                    value={Math.min(currentTime, progressMax)}
                    onChange={handleSeek}
                    className="w-full cursor-pointer accent-brand-gold"
                  />

                  <div className="mt-1 flex justify-between text-xs text-white/50">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(progressMax)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
            <button
              onClick={playPrevious}
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              ⏮
            </button>

            <button
              onClick={togglePlay}
              disabled={mediaMode === "video"}
              className="rounded-full bg-brand-gold px-7 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-105 disabled:opacity-40"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              onClick={playNext}
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              ⏭
            </button>

            <button
              onClick={() =>
                setMediaMode((mode) => (mode === "audio" ? "video" : "audio"))
              }
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              {mediaMode === "audio" ? "Video" : "Audio"}
            </button>

            <button
              onClick={() => setIsShuffle((value) => !value)}
              className={`rounded-full px-4 py-2 text-sm ${
                isShuffle
                  ? "bg-brand-gold text-black"
                  : "border border-white/20 hover:border-brand-gold hover:text-brand-gold"
              }`}
            >
              Shuffle
            </button>

            <button
              onClick={shareSong}
              className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-brand-gold hover:text-brand-gold"
            >
              Share
            </button>
          </div>
        </div>

        {!isLoggedIn && (
          <p className="mt-4 text-xs text-white/50">
            Preview mode: guests can listen for {previewLimit} seconds. Log in
            to unlock full playback.
          </p>
        )}
      </div>
    </div>
  );
}
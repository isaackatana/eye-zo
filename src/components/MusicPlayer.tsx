import { useEffect, useMemo, useRef, useState } from "react";
import type { Song } from "../pages/Music";

type MusicPlayerProps = {
  song: Song;
  songs: Song[];
  currentIndex: number;
  onSelectSong: (index: number) => void;
};

export default function MusicPlayer({
  song,
  songs,
  currentIndex,
  onSelectSong,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<"audio" | "video">("audio");
  const [shuffle, setShuffle] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const loggedIn = false;
  const previewLimitSeconds = 30;

  const source = useMemo(() => {
    if (mode === "video") return song.video;
    return loggedIn ? song.full : song.preview;
  }, [loggedIn, mode, song.full, song.preview, song.video]);

  useEffect(() => {
    setIsPlaying(false);
    setMode("audio");
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [song]);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (!loggedIn && isPlaying) {
      timeoutId = window.setTimeout(() => {
        pauseCurrentMedia();
        alert("Please log in to listen to the full version.");
      }, previewLimitSeconds * 1000);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isPlaying, loggedIn, song, mode]);

  const getActiveMedia = () => {
    return mode === "audio" ? audioRef.current : videoRef.current;
  };

  const playCurrentMedia = async () => {
    const media = getActiveMedia();
    if (!media) return;

    try {
      await media.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const pauseCurrentMedia = () => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pauseCurrentMedia();
      return;
    }

    await playCurrentMedia();
  };

  const handleModeChange = (nextMode: "audio" | "video") => {
    if (nextMode === mode) return;
    pauseCurrentMedia();
    setMode(nextMode);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${song.title} — ${song.artist}`,
      text: "Check out this track on EyeZo",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard.");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handlePrevious = () => {
    pauseCurrentMedia();

    if (shuffle && songs.length > 1) {
      let nextRandom = currentIndex;
      while (nextRandom === currentIndex) {
        nextRandom = Math.floor(Math.random() * songs.length);
      }
      onSelectSong(nextRandom);
      return;
    }

    const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    onSelectSong(previousIndex);
  };

  const handleNext = () => {
    pauseCurrentMedia();

    if (shuffle && songs.length > 1) {
      let nextRandom = currentIndex;
      while (nextRandom === currentIndex) {
        nextRandom = Math.floor(Math.random() * songs.length);
      }
      onSelectSong(nextRandom);
      return;
    }

    const nextIndex = currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
    onSelectSong(nextIndex);
  };

  const handleLoadedMetadata = () => {
    const media = getActiveMedia();
    if (!media) return;

    const mediaDuration = !loggedIn && mode === "audio"
      ? Math.min(media.duration || 0, previewLimitSeconds)
      : media.duration || 0;

    setDuration(mediaDuration);
  };

  const handleTimeUpdate = () => {
    const media = getActiveMedia();
    if (!media) return;

    const limitedTime =
      !loggedIn && mode === "audio"
        ? Math.min(media.currentTime, previewLimitSeconds)
        : media.currentTime;

    setCurrentTime(limitedTime);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const media = getActiveMedia();
    if (!media) return;

    const nextTime = Number(event.target.value);
    media.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    handleNext();
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressMax = duration || 0;
  const progressValue = Math.min(currentTime, progressMax || 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 text-white backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="shrink-0"
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-14 h-14 rounded-xl object-cover"
            />
          </button>

          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{song.title}</p>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            {!loggedIn && (
              <p className="text-xs text-amber-400 mt-1">
                Preview only. Log in for full playback.
              </p>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full bg-white/5 p-1">
            <button
              type="button"
              onClick={() => handleModeChange("audio")}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                mode === "audio" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Audio
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("video")}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                mode === "video" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
            >
              Video
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="rounded-full bg-white/10 px-3 py-2 hover:bg-white/20 transition"
              aria-label="Previous song"
            >
              ⏮
            </button>

            <button
              type="button"
              onClick={() => setShuffle((prev) => !prev)}
              className={`rounded-full px-3 py-2 text-sm transition ${
                shuffle ? "bg-blue-600 text-white" : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle shuffle"
            >
              🔀
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full bg-white text-black px-4 py-2 font-medium hover:bg-gray-200 transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="rounded-full bg-white/10 px-3 py-2 hover:bg-white/20 transition"
              aria-label="Next song"
            >
              ⏭
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="rounded-full bg-white/10 px-3 py-2 hover:bg-white/20 transition"
              aria-label="Share song"
            >
              Share
            </button>
          </div>
        </div>

        <div className="pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 text-xs text-gray-400">{formatTime(progressValue)}</span>

            <input
              type="range"
              min={0}
              max={progressMax || 0}
              step={0.1}
              value={progressValue}
              onChange={handleSeek}
              className="w-full accent-white"
            />

            <span className="w-10 text-xs text-right text-gray-400">
              {formatTime(progressMax)}
            </span>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-[520px] pb-5" : "max-h-0"
          }`}
        >
          <div className="border-t border-white/10 pt-4 grid gap-4">
            <div className="lg:hidden flex items-center gap-2 rounded-full bg-white/5 p-1 w-fit">
              <button
                type="button"
                onClick={() => handleModeChange("audio")}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  mode === "audio" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Audio
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("video")}
                className={`px-3 py-1.5 rounded-full text-sm transition ${
                  mode === "video" ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                Video
              </button>
            </div>

            {mode === "audio" ? (
              <div className="rounded-2xl bg-neutral-950 border border-white/10 p-4">
                <audio
                  ref={audioRef}
                  src={source}
                  controls
                  className="w-full"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleEnded}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
                <video
                  ref={videoRef}
                  src={source}
                  controls
                  className="w-full max-h-[360px] bg-black"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={handleEnded}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
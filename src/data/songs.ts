export type Song = {
  id: number;
  title: string;
  artist: string;
  type: string;
  audioUrl: string;
  videoUrl: string;
  coverUrl?: string;
};

export const songs: Song[] = [
  {
    id: 1,
    title: "Midnight Echo",
    artist: "Eye Zo",
    type: "Afro Fusion",
    audioUrl: "/audio/midnight-echo.mp3",
    videoUrl: "/videos/midnight-echo.mp4",
  },
  {
    id: 2,
    title: "Coastline Dreams",
    artist: "Eye Zo",
    type: "Ambient",
    audioUrl: "/audio/coastline-dreams.mp3",
    videoUrl: "/videos/coastline-dreams.mp4",
  },
  {
    id: 3,
    title: "Fire in Motion",
    artist: "Eye Zo",
    type: "Visual EP",
    audioUrl: "/audio/fire-in-motion.mp3",
    videoUrl: "/videos/fire-in-motion.mp4",
  },
];
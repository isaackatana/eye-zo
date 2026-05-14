import { useState } from "react";

import { uploadSong } from "../lib/uploadSong";
import { createSong } from "../lib/songService";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!audioFile || !coverFile) {
      alert("Select both song and cover.");
      return;
    }

    if (!title || !artist) {
      alert("Enter title and artist.");
      return;
    }

    try {
      setLoading(true);

      const uploadedAudioUrl = await uploadSong(
        audioFile,
        "songs"
      );

      const uploadedCoverUrl = await uploadSong(
        coverFile,
        "covers"
      );

      await createSong({
        title,
        artist,
        audioUrl: uploadedAudioUrl,
        coverUrl: uploadedCoverUrl,
      });

      alert("Song uploaded successfully.");

      setTitle("");
      setArtist("");
      setAudioFile(null);
      setCoverFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-gold">
        Creator Upload
      </p>

      <h1 className="mb-8 text-4xl font-bold">
        Upload Music
      </h1>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        {/* TITLE */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-white/60">
            Song Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter song title"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          />
        </div>

        {/* ARTIST */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-white/60">
            Artist Name
          </label>

          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
          />
        </div>

        {/* AUDIO */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-white/60">
            Song File
          </label>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) =>
              setAudioFile(e.target.files?.[0] || null)
            }
          />
        </div>

        {/* COVER */}
        <div className="mb-5">
          <label className="mb-2 block text-sm text-white/60">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverFile(e.target.files?.[0] || null)
            }
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded-full bg-brand-gold px-6 py-3 font-bold text-black disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </section>
  );
}
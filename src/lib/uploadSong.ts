import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { storage } from "./firebase";

export async function uploadSong(
  file: File,
  folder: "songs" | "covers"
) {
  const fileRef = ref(
    storage,
    `${folder}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);

  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL;
}
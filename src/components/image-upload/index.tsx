import React, { useState, ChangeEvent } from "react";
import { storage } from "utils/firebaseConfig";
// import { storage } from '../lib/firebaseConfig';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
  };

  const handleImageUpload = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const storageRef = ref(storage,`/files/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        // Progress tracking (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      },
      (error: any) => {
        // Handle errors
        console.error("Error uploading image: ", error);
      },
      () => {
        // Upload completed successfully, do something with the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: any) => {
          console.log("File available at", downloadURL);
          onImageUpload(downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;

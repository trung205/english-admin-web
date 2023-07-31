import React, { useState, ChangeEvent } from "react";
import { storage } from "utils/firebaseConfig";
// import { storage } from '../lib/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import styles from "./ImageUpload.module.scss";
import { Circle } from "@components/circle";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
}

enum UploadStatus {
  START = "start",
  LOADING = "loading",
  DONE = "done",
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);
  const [percent, setPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>(
    UploadStatus.START
  );
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);
    e.target.value = "";
    setUploadStatus(UploadStatus.START);
  };

  const handleRemoveSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setImage(null);
  };

  const handleImageUpload = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUploadStatus(UploadStatus.LOADING);
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        // Progress tracking (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(Math.ceil(progress));
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
          setUploadStatus(UploadStatus.DONE);
          onImageUpload(downloadURL);
        });
      }
    );
  };

  return (
    <div className={styles.variants}>
      <div className={styles.file}>
        <label htmlFor="input-file">
          <i className="bi bi-cloud"></i>Select a file
        </label>
        <input id="input-file" type="file" onChange={handleImageChange} />
        {image && (
          <div className={styles.file_block}>
            <div className={styles.file_info}>
              {" "}
              <i
                className={`bi bi-file-earmark-post-fill ${styles.file_icon}`}
              ></i>{" "}
              <span className={styles.file_name}>{image?.name}</span> |{" "}
              <span className={styles.file_size}>
                {Math.floor((image?.size as number) / 1024)}KB
              </span>{" "}
            </div>
            <i
              className={`bi bi-trash ${styles.remove_file_icon}`}
              onClick={handleRemoveSelect}
            ></i>
          </div>
        )}
      </div>
      {image && (
        <div className="d-flex justify-content-center align-items-center">
          {/* <input type="file" onChange={handleImageChange} /> */}
          <div
            className={`${styles.button_wrapper} 
          ${uploadStatus !== UploadStatus.START ? styles.loading : ""}
          ${uploadStatus === UploadStatus.DONE ? styles.done : ""}`}
            onClick={handleImageUpload}
          >
            <div className={styles.icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                />
              </svg>
            </div>
          </div>
          {uploadStatus !== UploadStatus.START && (
            <div className={styles.circle_progress}>
              <Circle
                progress={percent}
                roundedStroke
                progressColor="Maroon"
                bgColor="Moccasin"
                textColor="Maroon"
                showPercentageSymbol={false}
                size="50"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

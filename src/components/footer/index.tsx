import Image from "next/image";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
      <a
        href="https://github.com/pankod"
        target="_blank"
        className="d-block mb-3"
      >
        <Image
          src="/icons/pankod-icon.svg"
          alt="pankod"
          width="140"
          height="28"
        />
      </a>

      <ul className="d-flex justify-content-center list-unstyled p-0 m-0">
        <li className="mx-2">
          <Image
            src="/icons/github-icon.svg"
            alt="github"
            width="28"
            height="29"
          />
        </li>
        <li className="mx-2">
          <Image
            src="/icons/twitter-icon.svg"
            alt="twitter"
            width="28"
            height="28"
          />
        </li>
        <li className="mx-2">
          <Image
            src="/icons/youtube-icon.svg"
            alt="youtube"
            width="28"
            height="29"
          />
        </li>
        <li className="mx-2">
          <Image
            src="/icons/linkedin-icon.svg"
            alt="linkedin"
            width="28"
            height="32"
          />
        </li>
      </ul>
    </div>
  );
};

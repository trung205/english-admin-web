import React from "react";

import { Logo } from "@components";
import styles from "./Header.module.scss"

export const Header: React.FC = () => {
  return (
    <div className={`text-center ${styles.header}`} style={{ backgroundColor: "#fff" }}>
      <Logo />
    </div>
  );
};

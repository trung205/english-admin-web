import React from "react";

import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./Navbar.module.scss";

import { Logo } from "@components";

export const NavbarComponent: React.FC = ({ children }) => {
  return (
    <nav className={styles.navbar} id="sidebar-wrapper" role="navigation">
      <div className={styles.sidebar_header}>
        <Link href="/">
          <div className="text-white d-flex align-items-center justify-content-center">
            <i className="fs-4 bi bi-speedometer"></i>
            <span className="ms-1 fs-4">Brand</span>
          </div>
        </Link>
      </div>
      <ul className={`nav sidebar-nav flex-column ${styles.sidebar_content}`}>
        <li>
          <Link href="/">
            <div
              className={`${styles.item_nav} d-flex align-items-center justify-content-center`}
            >
              <i className="fs-4 bi bi-speedometer"></i>
              <span className="ms-1 fs-4 d-none d-md-inline">Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/posts/first-post">
            <div
              className={`${styles.item_nav} d-flex align-items-center justify-content-center`}
            >
              <i className="bi bi-table"></i>
              <span className="ms-1 fs-4 d-none d-md-inline">Post</span>
            </div>
          </Link>
        </li>
      </ul>
      <div className={styles.sidebar_footer}>
        <div className={`${styles.sidebar_footer_item} d-flex align-items-center justify-content-center`}>
          <i className="bi bi-box-arrow-in-left h4"></i>
          <span className="ms-1 fs-4 d-none d-md-inline">Logout</span>
        </div>
      </div>
    </nav>
  );
};

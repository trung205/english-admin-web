import React from "react";

import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useAppDispatch } from "@redux/store";
import { logout } from '../../redux/slices/auth';
import AuthService from "src/services/auth.service";
import {MENUS} from "../../../constants/menus"
import { useRouter } from 'next/router';

export const NavbarComponent: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout())
  }
  return (
    <nav className={styles.navbar} id="sidebar-wrapper" role="navigation">
      <div className={styles.sidebar_header}>
        <Link href="/">
          <div className="text-white d-flex align-items-center justify-content-center">
            <span className={`ms-1 fs-4 ${styles.text_brand}`}>#DNKHTA</span>
          </div>
        </Link>
      </div>
      <ul className={`nav sidebar-nav flex-column ${styles.sidebar_content}`}>
        {MENUS.map(item => {
          return (
            <li key={item.id} className={`${router.pathname.includes(item.route) ? styles.active : ""}`}>
            <Link href={item.route}>
              <div
                className={`${styles.item_nav} d-flex align-items-center justify-content-center`}
              >
                <i className={`fs-4 ${item.icon}`}></i>
                <span className="ms-1 fs-4 d-none d-md-inline">{item.name}</span>
              </div>
            </Link>
          </li>
          )
        })}
      </ul>
      <div className={styles.sidebar_footer}>
        <div className={`${styles.sidebar_footer_item} d-flex align-items-center justify-content-center`} onClick={handleLogout}>
          <i className="bi bi-box-arrow-in-left h4"></i>
          <span className="ms-1 fs-4 d-none d-md-inline">Logout</span>
        </div>
      </div>
    </nav>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/projects" className={styles.navLink}>Projects</Link>
        <Link to="/contact" className={styles.navLink}>Contact</Link>
        <Link to="/resume" className={styles.navLink}>Resume</Link>
      </nav>
    </header>
  );
}

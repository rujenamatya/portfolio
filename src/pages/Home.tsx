import { useEffect } from "react";
import styles from "../styles/Home.module.css";

declare global {
  interface Window {
    runGeoPopup?: () => void;
    geoPopupShown?: boolean;
  }
}

export default function Home() {
  useEffect(() => {
    // Only show popup once per session on home page
    if (window.runGeoPopup && !window.geoPopupShown) {
      window.runGeoPopup();
      window.geoPopupShown = true;
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.heroSection}>
        <img 
          src="/headshot.webp" 
          alt="Rujen Amatya" 
          className={styles.heroImage}
        />
        <h1 className={styles.name}>Rujen Amatya</h1>
        <p className={styles.tagline}>
          Software Engineer | Full Stack Developer | <span className={styles.highlight}>Tech Enthusiast</span>
        </p>
      </div>
    </div>
  );
}

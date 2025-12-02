import { useEffect, useState } from "react";
import styles from "../styles/About.module.css";
import { fetchAbout } from "../services/mongoClient";

interface AboutData {
  info: string;
}

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await fetchAbout();
        setAbout(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading about me:", err);
        setError("Failed to load about information. Make sure the server is running.");
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>About Me</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <p className={styles.content}>{about?.info}</p>
      )}
    </div>
  );
}

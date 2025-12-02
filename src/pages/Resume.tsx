import styles from "../styles/Resume.module.css";

export default function Resume() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Resume</h1>
      <a href="./resume.pdf" download className={styles.downloadLink}>
        Download PDF
      </a>

      <iframe
        src="./resume.pdf"
        title="Resume PDF Preview"
        className={styles.preview}
      />
    </div>
  );
}

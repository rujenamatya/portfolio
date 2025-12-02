import React, { useState, useEffect } from "react";
import styles from "../styles/Projects.module.css";
import shared from "../styles/shared.module.css";
import { fetchProjects } from "../services/mongoClient";

interface Project {
  _id: string;
  title: string;
  description?: string;
  role: string;
  technologyUsed: string[];
  links?: {
    github?: string;
    live?: string;
  };
  learnings?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load projects. Make sure the server is running.");
        setLoading(false);
        console.error("Error loading projects:", err);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>My Projects</h1>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>My Projects</h1>
        <div className={`${shared.alert} ${shared.alertError}`}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Projects</h1>
      <p className={styles.intro}>
        Here are some of the projects I've worked on:
      </p>

      {projects.length === 0 ? (
        <p className={styles.emptyState}>No projects found. Add some projects to your MongoDB database!</p>
      ) : (
        <div className={styles.grid}>
          {projects.map((project) => (
            <div key={project._id} className={styles.card}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              
              <p className={styles.role}>
                Role: {project.role}
              </p>

              {project.description && (
                <p className={styles.description}>
                  {project.description}
                </p>
              )}

              <div className={styles.techSection}>
                <strong className={styles.techLabel}>
                  Technologies:
                </strong>
                <div className={styles.techList}>
                  {project.technologyUsed.map((tech, index) => (
                    <span key={index} className={styles.techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.learnings && (
                <div className={styles.learningsSection}>
                  <strong className={styles.learningsLabel}>
                    Key Learnings:
                  </strong>
                  <p className={styles.learningsText}>
                    {project.learnings}
                  </p>
                </div>
              )}

              {project.links && (
                <div className={styles.linksContainer}>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubLink}
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.liveLink}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

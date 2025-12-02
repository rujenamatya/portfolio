import React, { useState, FormEvent } from "react";
import styles from "../styles/Contact.module.css";
import shared from "../styles/shared.module.css";
import { submitContactForm } from "../services/mongoClient";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Submitting..." });

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully."
        });
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to submit form. Please try again."
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please make sure the server is running."
      });
      console.error("Form submission error:", error);
    }
  };

  const getAlertClass = () => {
    if (status.type === "success") return `${shared.alert} ${shared.alertSuccess}`;
    if (status.type === "error") return `${shared.alert} ${shared.alertError}`;
    return `${shared.alert} ${shared.alertInfo}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Me</h1>
      <p className={styles.intro}>Have a question or want to work together? Send me a message!</p>
      
      <form onSubmit={handleSubmit} className={shared.formContainer}>
        <div className={shared.formGroup}>
          <label htmlFor="name" className={shared.label}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={shared.input}
          />
        </div>

        <div className={shared.formGroup}>
          <label htmlFor="email" className={shared.label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={shared.input}
          />
        </div>

        <div className={shared.formGroup}>
          <label htmlFor="message" className={shared.label}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className={shared.textarea}
          />
        </div>

        <button
          type="submit"
          disabled={status.type === "loading"}
          className={shared.button}
        >
          {status.type === "loading" ? "Sending..." : "Submit"}
        </button>

        {status.message && (
          <div className={getAlertClass()}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}

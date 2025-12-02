const API_BASE_URL = process.env.NODE_ENV === 'production' ? "https://portfolio-api.onrender.com" : "http://localhost:3000";

/**
 * Fetches all projects from the backend API
 * @returns Promise with array of projects
 */
export async function fetchProjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

/**
 * Fetches about me information from the backend API
 * @returns Promise with about data
 */
export async function fetchAbout() {
  try {
    const response = await fetch(`${API_BASE_URL}/about`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching about:", error);
    throw error;
  }
}

/**
 * Submits contact form data to the backend API
 * @param data - Object containing name, email, and message
 * @returns Promise with submission result
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

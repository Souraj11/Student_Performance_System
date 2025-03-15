import axios from "axios";

const API_URL = "http://localhost:3000";  // Adjust to your backend URL

export const getRecommendations = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/recommendations/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations", error);
    return { recommended_courses: [] };  // Return empty array on error
  }
};

import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api";  


export const addstudenttoBackend = async (student) => {
  try {
  
    const response = await axios.post(`${API_URL}/students`, student);

    
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    return null;  
  }
};


export const getRecommendations = async (studentId) => {
  try {
    
    const response = await axios.get(`${API_URL}/recommendations/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return { recommended_courses: [] };  
  }
};

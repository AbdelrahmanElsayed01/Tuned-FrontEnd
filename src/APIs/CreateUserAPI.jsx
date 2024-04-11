import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Correct API server address

const api = axios.create({
  baseURL: BASE_URL,
});

export const registerUser = async (user) => {
    try {
      const response = await api.post('/users', user);
      console.log('Response from API:', response.data); // Log the response
      return response.data;
    } catch (error) {
      throw error;
    }
  };
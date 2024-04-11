import axios from 'axios';
import AccessToken from './AccessToken';
const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/users/login', {
      username: username,
      password: password,
    });

    if (response.status === 201) {
      console.log("test",response.data.accessToken)
      AccessToken.setAccessToken(response.data.accessToken)
      AccessToken.setSpotifyAccessToken()
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Login failed. Please check your credentials.' };
    }
  } catch (error) {
    return { success: false, message: 'Error during login. Please try again later.' };
  }
};


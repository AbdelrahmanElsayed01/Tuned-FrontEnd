import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const BASE_URL = 'https://accounts.spotify.com';

const api = axios.create({
  baseURL: BASE_URL,
});

const AccessToken = {
  getSpotifyAccessToken: () => sessionStorage.getItem("spotifyAccessToken"),
    
  setSpotifyAccessToken: async () => {
    try {
      const response = await api.post(
        '/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: '6bea5aab4c184691a3d2b75a14140162',
            password: '3b35e1a452384a828dc9256f44ff22ce',
          },
        }
      );
       sessionStorage.setItem('spotifyAccessToken', response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  },
  getAccessToken: () => sessionStorage.getItem("accessToken"),
  
  setAccessToken: async (token) => {
    try {

      sessionStorage.setItem('accessToken', token);
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem('claims', JSON.stringify(decodedToken));
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  },
  getClaims: () => {
    if (!sessionStorage.getItem('claims')) {
      return undefined;
    }
    return JSON.parse(sessionStorage.getItem('claims'));
  },
  clear: () => {
    sessionStorage.removeItem('spotifyAccessToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('claims');
  },
};

export default AccessToken;

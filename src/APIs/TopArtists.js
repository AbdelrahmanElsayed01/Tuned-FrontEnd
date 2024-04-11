import axios from 'axios';
import AccessToken from './AccessToken';

const BASE_URL = 'http://localhost:8080';
const token = AccessToken.getAccessToken();
const claims = AccessToken.getClaims();

const topArtistsAPI = {
  getTopArtists: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/top`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to fetch top artists');
    }
  }
};

export default topArtistsAPI;

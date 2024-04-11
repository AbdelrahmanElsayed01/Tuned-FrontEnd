import axios from 'axios';
import AccessToken from './AccessToken';

const BASE_URL = 'http://localhost:8080';
const token =AccessToken.getAccessToken()
const claims = AccessToken.getClaims()

const playlistManagement = {
  addSongToPlaylist: async (request) => {
    try {
      const response = await axios.post(`${BASE_URL}/playlists/add`, request, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to add song to playlist');
    }
  },
  getPlaylistIdByUserId: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/playlists/playlistId`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
       throw new Error(error.response.data.message || 'Failed to fetch playlist ');

    }
  },

  getAllSongsInPlaylistPathVariable: async (userId) => {
    try {
      const token = AccessToken.getAccessToken();
      const response = await axios.get(`${BASE_URL}/playlists/add/`+ userId, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error(error)
    }

  },

  getAllSongsInUserPlaylist: async () => {
    try {
      const token = AccessToken.getAccessToken();
  
      const response = await axios.get(`${BASE_URL}/playlists/songs`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to fetch playlist songs');
    }
  },
  
  
  deleteSongFromPlaylist: async (request) => {
    try {
      const response = await axios.delete(`${BASE_URL}/playlists/delete`, {
        params: { playlistId: request.playlistId, songId:request.songId },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Failed to delete song from playlist');
    }
  }
};
export default playlistManagement;

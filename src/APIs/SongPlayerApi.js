import axios from 'axios';
import  AccessToken  from './AccessToken';

const url = 'https://api.spotify.com/v1/me/player/play?device_id=873b5e831273b3f124cb2b7b1ce01330884f4347';
const SONG_BASE_URL="http://localhost:8080/songs/"

const SongPlayerApi = {
    playSong: async (uri) => {
        console.log("test uri",uri) 
        const accessToken = await AccessToken.getAccessToken();
        console.log("test token",accessToken)   
        const trackData = {
            uris: ['spotify:track:1DMEzmAoQIikcL52psptQL'],
            position_ms: 0
          };
        
        
          try {
            const response = await axios.put(url, trackData, {
              headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
            });
            console.log('Response:', response.data);
            return response.data;
          } catch (error) {
            console.error('Error playerapi:', error);
            throw error;
          }
    },
    addSong: async (song) => {
      try {
        const accessToken = AccessToken.getAccessToken();
         console.log("song",song)
        const response = await axios.post(SONG_BASE_URL + "save", song, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error saving song:', error);
        throw error;
      }
    },
    //TODO getSong 
    
};

export default SongPlayerApi;

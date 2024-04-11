import axios from 'axios';
import AccessToken from './AccessToken';
const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
});

 const GoPremiumApi={
  goPremium: async () => {
    try {
      const userId =AccessToken.getClaims().userId
      const response = await api.put(`/users/${userId}/switchSubscription`);
      console.log('Subscription switch response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error switching subscription:', error);
      throw error;
    }
  }
 }
 export default GoPremiumApi



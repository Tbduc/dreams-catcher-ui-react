import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'https://localhost:8080/api/v1/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'dreamer', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mentor', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
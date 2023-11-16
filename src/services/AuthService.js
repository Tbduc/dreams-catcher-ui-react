import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";
const API_URL = "http://localhost:8080/api/v1/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        console.log(response.data)
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem(ACCESS_TOKEN)
  }

  register(username, email, password, role) {
    console.log(role)
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async getCurrentUserImgId(userId) {
    return axios.get(API_BASE_URL + `/api/v1/users/profile-auth/${userId}`)
    .then(response => {
      console.log(response.data)
      return response.data;
    })
  }

  getCurrentUserOauth2() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject("No access token set.");
    }
  
    return axios.get(API_BASE_URL + "/api/v1/users/profile")
    .then(response => {
      localStorage.setItem("user", JSON.stringify(response.data));

      return response.data;
    })
  }
}

export default new AuthService();
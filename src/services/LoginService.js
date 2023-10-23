import axios from "axios"

const DREAMER_API_BASE_URL = "http://localhost:8080/api/v1/auth/signin"

class LoginService {
    signingIn(login) {
        return axios.post(DREAMER_API_BASE_URL, login);
    }
}

export default new LoginService();
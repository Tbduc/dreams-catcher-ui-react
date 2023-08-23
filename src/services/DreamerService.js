import axios from "axios"

const DREAMER_API_BASE_URL = "https://localhost:8080/api/v1/dreamers/create"

class DreamerService {
    saveDreamer(dreamer) {
        return axios.post(DREAMER_API_BASE_URL, dreamer);
    }
}

export default new DreamerService();
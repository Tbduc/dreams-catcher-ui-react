import axios from "axios"

class OfferService {
  constructor() {
    this.state = {
        data: {}
    }
  }

  async saveOffer(offer) {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const config = {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        }
      }
      const response = await axios.post(
        `http://localhost:8080/api/v1/mentors/offer`,
        offer, config
      )
      console.log(response.data)
      this.state.data = response.data
      return response.status;
    } catch (err) {
      console.warn(err);
      return err;
    }
  }

  async uploadFile(file) {
    const offerId = this.state.data.id
    console.log(offerId)
    const formData = new FormData();
    const config = {
        headers: {
        "Content-Type": "multipart/form-data"
        }
    };
    formData.append("image", file);
    formData.append("offerId", offerId);
    return axios
        .post("http://localhost:8080/api/v1/upload", formData, config)
        .then(response => response.status)
        .catch(err => console.warn(err));
  }
}

export default new OfferService();
import axios from "axios";

const USER_ACC_API_BASE_URL = "http://localhost:8080/api/v1/user-account/";

const PasswordService = async (props) => {
    console.log(props)
    if (props) {
        return await axios.post(USER_ACC_API_BASE_URL + "forgot-password", null,
            { params: { email: props} ,})
        .then(response => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export default PasswordService
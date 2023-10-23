import axios from "axios";

const USER_ACC_API_BASE_URL = "http://localhost:8080/api/v1/user-account/";

const UpdatePasswordService = async (email, password) => {
    console.log(email)
    console.log(password)
    if (email && password) {
        return await axios.post(USER_ACC_API_BASE_URL + "reset-password", null,
            { params: { email: email, password: password} ,
          })
        .then(response => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export default UpdatePasswordService
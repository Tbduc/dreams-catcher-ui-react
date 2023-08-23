import axios from "axios"
import { ACCESS_TOKEN } from "../constants"

const PAYPAL_API_BASE_URL = "https://localhost:8080/payment/create"

const PaypalService = async (props) => {
        console.log(props)
        const user = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem(ACCESS_TOKEN)
        let headersString = null
        if (user.accessToken == undefined)
            headersString = accessToken;
        else
            headersString = user.accessToken

        const formData = new FormData();
        formData.append("method", props.method);
        formData.append("amount", props.amount);
        formData.append("currency", props.currency);
        formData.append("description", props.description);
        formData.append("dreamId", props.dreamId);
        formData.append("userId", user.id);

        return await axios({
                maxRedirects: 0,
                method: 'post',
                url: PAYPAL_API_BASE_URL,
                data: formData,
                headers: {
                        Authorization: `Bearer ${headersString}`,
                        'content-type': 'application/x-www-form-urlencoded',
                }
        })
}

export default PaypalService
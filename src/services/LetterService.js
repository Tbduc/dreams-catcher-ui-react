import axios from "axios"
import { ACCESS_TOKEN } from "../constants"

const LETTER_API_BASE_URL = "https://localhost:8080/api/v1/inbox/new_letter"

const LetterService = async (props) => {
        const user = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem(ACCESS_TOKEN)
        let headersString = null
        if (user.accessToken == undefined)
            headersString = accessToken;
        else
            headersString = user.accessToken

        const data = {
            content: props.description,
            sender: user.username
        }
        console.log(headersString)
        return await axios({
                maxRedirects: 0,
                method: 'post',
                url: LETTER_API_BASE_URL,
                data: data,
                headers: {
                        Authorization: `Bearer ${headersString}`,
                        'content-type': 'application/json',
                }
        })
}

export default LetterService
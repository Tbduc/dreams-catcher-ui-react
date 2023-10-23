import React, { useState } from 'react';
import "../../styles/global.css"
import axios from 'axios';

const CommentComponent = (props) => {

    const [comment, setComment] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = localStorage.getItem("accessToken")
    let config = {};

    const handleChange = (e) => {
        const value = e.target.value;
        setComment({comment: value})
    }
    if (user) {
        if (!user.accessToken)
        config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
        }
        else
        config = {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        }
        }
    }

    const addComment = async () => {
        const COMMENT_URL = `http://localhost:8080/api/v1/dreams/${props.data.id}/comment`;
        try {
            if (user.id)
                return await axios.post(COMMENT_URL, comment, config)
                .then(response =>
                    console.log(response.data)
                )
                .then(async() => {
                    await delay(5000)
                    refreshPage()
                })
        } catch (error) {
            console.log("error", error);
        }
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    return (
        user &&
        <div className="w-50">
            <div className="container">
                <div className="text-center">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <h5>Add a comment</h5>
                        <div className="form-outline">
                            <textarea className="form-control" id="textAreaExample" rows="4" onChange={(e) => handleChange(e)}></textarea>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button onClick={addComment} type="button" class="btn btn-danger">
                                Add <i className="fas fa-long-arrow-alt-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentComponent;
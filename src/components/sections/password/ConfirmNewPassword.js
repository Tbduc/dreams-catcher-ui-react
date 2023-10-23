import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UpdatePasswordService from '../../../services/UpdatePasswordService';

const ConfirmNewPassword = () => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const url = window.location.href;
    const queryString = url ? url.split('?token=')[1] : window.location.search.slice(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setToken(queryString)
                const response = await axios.post('http://localhost:8080/api/v1/user-account/confirm-reset', null, { params: { token: token }, });
                setEmail(response.data)
                return console.log(response.data);
            } catch (error) {
                return console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const onSubmit = () => {
        UpdatePasswordService(email, password)
        .then();
    }

    return (
        <div>
            <div className="container mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  defaultValue={email}/>
                        <label for="exampleInputEmail1" className="form-label">Password</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e) => handleChangePassword(e)}/>
                        <div id="emailHelp" className="form-text">Update your password.</div>
                        <button onClick={onSubmit} className="btn btn-primary mt-3">Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ConfirmNewPassword;
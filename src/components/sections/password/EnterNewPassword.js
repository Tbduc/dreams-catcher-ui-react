import React, { useState, useEffect } from 'react';
import UpdatePasswordService from '../../../services/UpdatePasswordService';
import { error } from 'jquery';

const EnterNewPassword = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onSubmit = () => {
        UpdatePasswordService(email, password)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="container mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        <label for="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e) => handleChangeEmail(e)}/>
                        <label for="exampleInputEmail1" className="form-label">Password</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e) => handleChangeEmail(e)}/>
                        <div id="emailHelp" className="form-text">Enter your email in order to receive a link to reset the password.</div>
                        <button onClick={onSubmit} className="btn btn-primary mt-3">Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EnterNewPassword;
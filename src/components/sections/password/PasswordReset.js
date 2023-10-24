import React, { useState, useEffect } from 'react';
import PasswordService from '../../../services/PasswordService';

const PasswordReset = () => {
    const [email, setEmail] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onSubmit = () => {
        PasswordService(email)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }

    return (
        <div>
            <div className="container mb-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 text-center">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e) => handleChange(e)}/>
                        <div id="emailHelp" className="form-text">Enter your email in order to receive a link to reset the password.</div>
                        <button onClick={onSubmit} className="btn btn-primary mt-3">Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PasswordReset;
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PaypalService from "../../services/PaypalService";
import LetterService from "../../services/LetterService";

const PaypalComponent = () => {

  const { id } = useParams();
  const [data, setData] = useState({
    method: "Paypal",
    amount: "",
    currency: "USD",
    description: "",
    dreamId: id
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setData({...data, [e.target.name]:value})
  }

  const onSubmit = () =>{
    sendData(data)
  }

  const sendData= (e) => {
    console.log(data)
    PaypalService(data)
    .then((response) => {
        if (response.status == 200)
            window.location = response.data
    })
    .catch((error) => {
        console.log(error);
    })
    .then( 
      LetterService(data)
    )
  }

  
  return (
    <div className="container d-flex justify-content-center">
        <div className="row w-50">
            <h1 className="text-center mt-5 mb-5 text-dark">Fund this Dream</h1>
                <div className="mb-3">
                    <input id="method" type="hidden" className="form-control"
                            name="method" value={data.method} readonly />
                </div>
                <div className="mb-3">
                    <label for="amount" className="form-label">Amount</label>
                    <input id="amount" type="number" className="form-control"
                            name="amount" value={data.amount} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="mb-3">
                    <label for="currency" className="form-label">Currency</label>
                    <select className="form-control" id="currency" name="currency" value={data.currency} onChange={(e) => handleChange(e)} required>
                        <option value="USD" selected>USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Letter content</label>
                    <textarea id="description" className="form-control"
                            name="description" value={data.description} onChange={(e) => handleChange(e)} required/>
                </div>
                <div className="d-flex justify-content-center">
                    <button onClick={onSubmit} className='btn btn-primary mb-3'>Fund with Paypal</button>
                </div>
        </div>
    </div>
  );
}

export default PaypalComponent
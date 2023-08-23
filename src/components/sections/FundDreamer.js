import React, { useState, useRef } from "react";

const FundDreamer = () => {
  const baseURL = "https://localhost:8080/api/v1/dreamers";

  const put_id = useRef(null);
  const put_amount = useRef(null);

  const [putResult, setPutResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }
  
  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        amount: put_amount.current.value,
      };

      try {
        const res = await fetch(`${baseURL}/donate/${id}/${putData.amount}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(putData),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
    }
  }
  
  const clearPutOutput = () => {
    setPutResult(null);
  }
  
  return (
    <div className="card">
      <div className="card-header">Fund Dreamer</div>
      <div className="card-body w-25">
        <div className="form-group">
          <input type="text" className="form-control" ref={put_id} placeholder="Dreamer Id" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control mt-1" ref={put_amount} placeholder="Amount" />
        </div>
        <button className="btn btn-sm btn-primary me-1 mt-2" onClick={putData}>Update Dreamer's Funds</button>
        <button className="btn btn-sm btn-warning ms-1 mt-2" onClick={clearPutOutput}>Clear</button>

        { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
      </div>
    </div>
  );
}

export default FundDreamer
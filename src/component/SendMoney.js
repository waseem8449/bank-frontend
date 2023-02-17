import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SendMoney = () => {
  const token = localStorage.getItem("token");

  const [Account, setAccount] = useState();
  const [Amount, setAmount] = useState();
  const history = useHistory();

  const send = async (e) => {
    e.preventDefault();
    const res = await fetch(`/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `token ${token}` : "",
    },
    body:JSON.stringify({
        Account: Account,
        Amount: Amount
      })
    });
    const data = await res.json();
    console.log("sdfg", data);
    if (res.status === 404 || !data) {
      alert("data not found");
      console.log("error");
    } else {
      alert("amount has been send successfully")
      history.push("/Candidate");

      console.log("get data ");
    }
  };
  return (
    <div>
      {" "}
      <h1 className="mt-5 text-center">Send Money</h1>
      <form
        className="mt-5 w-40 "
        style={{ marginLeft: "14rem", marginRight: "10rem", width: "20rem" }}
      >
        <div className="mb-3  ">
          <label htmlFor="name" className="form-label">
            AccountNo
          </label>
          <input
            type="text"
            value={Account}
            placeholder=" Account No"
            onChange={(e) => {
              setAccount(e.target.value);
            }}
            className="form-control"
            name="name"
            id="name"
          />
        </div>
        <div className="mb-3  ">
          <label htmlFor="name" className="form-label">
            Amount
          </label>
          <input
            type="text"
            value={Amount}
            placeholder=" Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="form-control"
            name="name"
            id="name"
          />
        </div>

        <div className="btns text-center">
          <button type="submit" onClick={send} className="btn btn-primary ">
            SendMoney
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMoney;

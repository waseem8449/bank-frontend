import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Navbar from "./Navbar";
const Candidate = () => {
  const history = useHistory("");
  const routeChange = () => {
    let path = `/send`;
    history.push(path);
  };
  const token = localStorage.getItem("token");

  const [Users, setUsers] = useState();

  const showData = async (id) => {
    const res = await fetch(`/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `token ${token}` : "",
      },
    });
    const data = await res.json();
    console.log("sdfg", data);
    if (res.status === 404 || !data) {
      alert("data not found");
      console.log("error");
    } else {
      setUsers(data);
      console.log("get data ");
    }
  };
  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center  w-60 ">
        <div
          className="border border-white shadow-lg "
          style={{
            zIndex: 100,
          }}
        >
          <h1 className="text-white text-center"> Transactions History</h1>
          <h1 className="text-white text-center">
            {" "}
            UserName {Users ? Users[0]?.senderID?.name : ""}
          </h1>
          <div className="d-flex-col align-items-center justify-content-between p-5 mx-5">
          <div className="add_btn  mt-2 mb-2">
            <Button onClick={routeChange} className=" btn btn-primary">SendMoney</Button>
          </div>
            <table className="table">
              <thead>
                <tr className="table-dark">
                  <th scope="col">id</th>
                  <th scope="col">Sender Name</th>
                  <th scope="col">Sender AccountNo</th>
                  <th scope="col">Remaining Balance</th>

                  <th scope="col">amount</th>
                  <th scope="col">receiver name</th>
                  <th scope="col">receiver AccountNo</th>
                </tr>
              </thead>
              <tbody>
                {console.log("elemen-----t", Users)}
                {Users?.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th key={element._id} scope="row">
                          {id + 1}
                        </th>
                        <td>{element?.senderID?.name}</td>
                        <td>{element?.senderID?.accountNo}</td>
                        <td>{element?.senderBalance || 0}</td>
                        <td>{element.amount || 0}</td>

                        <td>{element?.receiverID?.name}</td>
                        <td>{element?.receiverID?.accountNo || 0}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidate;

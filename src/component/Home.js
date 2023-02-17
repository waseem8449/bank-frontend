import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Navbar from "./Navbar";

const Home = () => {
  const [Users, setUsers] = useState();
  const [showUsers, setshowUsers] = useState();
  const [userdata, setUserdata] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem("token");

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  const getdata = async (e) => {
    // e.preventDefault();
    const res = await fetch("/getCandidateList", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        authorization: token ? `token ${token}` : "",
      },
    });
    const data = await res.json();
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      // console.log("333d,", data);
      setUserdata(data);
      console.log("get data ");
    }
  };
  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteUser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? `token ${token}` : "",
      },
    });
    const deletedata = await res2.json();
    // console.log(deletedata);
    if (res2.status === 422 || !deletedata) {
      alert("error");
      console.log("error");
    } else {
      alert("user deleted ");
      getdata();
      console.log("user deleted ");
    }
  };

  const showData = async (id) => {
    console.log("cities", id);
    const res = await fetch(`/showUser/${id}`, {
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
    getdata();
  }, []);
  return (
    <>
          <Navbar />

    <div style={{height:"6px"}}>
    <h1 className=" text-center">Banker DashBoard</h1>

    </div>
      {showModal && (
        <div
          className="d-flex justify-content-center align-items-center  mt-5 w-60 h-72"
          style={{ zIndex: "100" }}
        >
          <div
            className="border border-white shadow-lg z-index-n1 bg-#D3D3D3 position-absolute  "
            style={{
              backgroundColor:"#D3D3D3",
              marginTop:"48rem"
            }}
          >
            <button
              className="bg-transparent border-0 text-end"
              onClick={() => setshowModal(false)}
            >
              <span className="text-white h-10 w-10  fs-1">x</span>
            </button>
            <h1 className=" text-center">User Transactions History</h1>
            <div className="d-flex-col align-items-center justify-content-between p-5 mx-5">
              <table className="table">
                <thead>
                  <tr className="table-dark">
                    <th scope="col">id</th>
                    <th scope="col">Sender Name</th>
                    <th scope="col">Sender AccountNo</th>
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
                          <td>{element.amount || 0}</td>
                          <td>{element?.receiverID?.name}</td>
                          <td>{element?.receiverID?.accountNo}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <div className="mt-5" style={{ zIndex: 999 }}>
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <Button onClick={routeChange}>Open New Account</Button>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">AccountNo</th>
                <th scope="col">email</th>
                <th scope="col">name</th>

                <th scope="col">amount</th>

                <th scope="col">action</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {userdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th key={id * 5} scope="row">
                        {id + 1}
                      </th>
                      <td>{element.accountNo}</td>
                      <td>{element.email}</td>
                      <td>{element.name}</td>
                      <td>{element.amount || 0}</td>

                      <td className="d-flex justify-content-between">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setshowModal(true);
                            showData(element._id);
                          }}
                        >
                          Show User
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteuser(element._id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Home;

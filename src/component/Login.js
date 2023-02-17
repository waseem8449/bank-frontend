import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const setdata = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post("/Login", user);
    // const data = await res.json();
    // const { token } = data;
    const token = res.data.token;
    localStorage.setItem("token", token);
    console.log(res,"res", res?.data?.user?.userType);
    if (res) {
      alert("login sucessfully");
      if (res?.data?.user?.userType == "Banker") {
        history.push("/Home");
      } else {
        history.push("/Candidate");
      }
    } else {
      alert("error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 md:py-8 lg:px-10 mt-5">
        <div className="mt-8">
          <form action="#" autoComplete="off" style={{alignContent:"center"}}>
            <div className="row">
              <div className="mb-3">
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <label htmlFor="InputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={setdata}
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3 col-lg-6 col-md-6 col-12">
                  <label htmlFor="InputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="sign-in-email"
                    className="form-control"
                    name="password"
                    value={user.password}
                    onChange={setdata}
                    placeholder="Your password"
                  />
                </div>
                <button
                  type="submit"
                  onClick={login}
                  className="onChange={setdata}btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;

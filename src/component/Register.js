import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
const Register = () => {
  const history = useHistory("");

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  const addinpdata = async (e) => {
    e.preventDefault();
    const { name, email, password, userType } = inpval;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        userType,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404 || !data) {
      alert("error");
      console.log("error");
    } else {
      alert("data added");
      history.push("/Login");
      console.log("data added");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container border border-primary mt-5">
        <form className="mt-5" style={{float:"center"}}>
          <h1>
            <center>Online Banking System</center>
          </h1>
          <div className="row">
            <div className="mb-3">
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={inpval.name}
                  onChange={setdata}
                  className="form-control"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="InputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  value={inpval.email}
                  onChange={setdata}
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="InputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={inpval.password}
                  onChange={setdata}
                  className="form-control"
                  name="password"
                  id="password"
                />
              </div>
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="userType" className="form-label">
                  UserType
                </label>
                <select
                  type="number"
                  value={inpval.userType}
                  onChange={setdata}
                  className="form-control"
                  name="userType"
                  id="userType"
                >
                  <option value="Candidate">Candidate</option>
                  <option value="Banker">Banker</option>
                </select>
              </div>
              <div className="btns">
                <button
                  type="submit"
                  onClick={addinpdata}
                  className="btn btn-primary"
                >
                  Create Account
                </button>

                <NavLink to="/login">
                  <button className="m-4 btn btn-primary">Login</button>
                </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;

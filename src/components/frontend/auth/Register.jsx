import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [errorList, setError] = useState([""]);
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("/registration", registerInput)
      .then((res) => {
        if (res.data.status === false) {
          setError(res.data.errors);
        } else {
          setError([""]);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("role", res.data.role);
          swal("Success",res.data.message,"success");
          navigate("/home");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Registration Form</h4>
              </div>
              <div className="card-body">
                <form onSubmit={submitForm}>
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.name}
                      name="name"
                    />
                    <span className="text-danger">{errorList.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.email}
                      name="email"
                    />
                    <span className="text-danger">{errorList.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.password}
                      name="password"
                    />
                    <span className="text-danger">{errorList.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.confirm_password}
                      name="confirm_password"
                    />
                    <span className="text-danger">
                      {errorList.confirm_password}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setData] = useState([""]);
  const [errorList, setError] = useState([""]);

  const handleInput = (e) => {
    e.persist();
    setData({ ...inputData,[e.target.name]:e.target.value });
  }

  const loginUser = (e) => {
    e.preventDefault();
    axios.post('login',inputData).then((res)=>{
      if (res.data.status === false) {
        setError(res.data.errors);
      } else if (res.data.status === 401) {
        swal("Warning", res.data.error, "warning");
      } else {
        setError([""]);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);
        swal("Success", res.data.message, "success");
        if (res.data.role === 1){
          navigate("/admin");
        }else{
          navigate("/home");
        }
      }
    })
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login Form</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginUser}>
                  <div className="form-group mb-3">
                    <label>Email ID</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleInput}
                      value={inputData.email}
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
                      value={inputData.password}
                      name="password"
                    />
                    <span className="text-danger">{errorList.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Login
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

export default Login;

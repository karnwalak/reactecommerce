import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutForm = (e) => {
    e.preventDefault();
    axios.post("/logout").then((res) => {
      if (res.data.status === true) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        swal("Success", res.data.message, "success");
        navigate("/login");
      }
    });
  };
  var AuthButton = "";
  if (!localStorage.getItem("token")) {
    AuthButton = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButton = (
      <li className="nav-item">
        <button
          type="button"
          onClick={logoutForm}
          className="nav-link btn btn-danger btn-sm text-white"
        >
          Logout
        </button>
      </li>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          WebsiteName
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Collection
              </Link>
            </li>
            {AuthButton}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

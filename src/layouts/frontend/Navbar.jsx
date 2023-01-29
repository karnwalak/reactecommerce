import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartItem, setCartItem] = useState([]);
  useEffect(() => {
    axios.get("/fetch-cart-data").then((res) => {
      if (res.data.status === true) {
        setCartItem(res.data.data);
      }
    });
  }, []);
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
  let cartCount = "";
  if (cartItem.length > 0) {
    cartCount = (
      <label className="badge btn btn-danger position-absolute">
        {cartItem.length}
      </label>
    );
  } else {
    cartCount = "";
  }
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
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to="/show-cart-item"
            className="nav-link btn btn-success text-white mx-2"
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            {cartCount}
          </Link>
        </li>
        <li className="nav-item mx-4">
          <button
            type="button"
            onClick={logoutForm}
            className="nav-link btn btn-danger btn-sm text-white"
          >
            Logout
          </button>
        </li>
      </ul>
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
              <Link className="nav-link" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">
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

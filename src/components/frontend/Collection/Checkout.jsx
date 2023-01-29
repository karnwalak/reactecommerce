import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [errorList, setError] = useState([]);
  const [checkoutInput, setInput] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state_code: "",
    zip_code: "",
    payment_mode: "",
    payment_id: "",
  });

  const handleInput = (e) => {
    e.persist();
    setInput({ ...checkoutInput, [e.target.name]: e.target.value });
  };


  const submitOrder = (e, payment_mode) => {
    e.preventDefault();
    var data = {
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      mobile: checkoutInput.mobile,
      email: checkoutInput.email,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state_code: checkoutInput.state_code,
      zip_code: checkoutInput.zip_code,
      payment_mode: payment_mode,
      payment_id: '',
    };

    switch (payment_mode) {
      case "cod":
        axios.post("/place-order", data).then((res) => {
          if (res.data.status === true) {
            setError([""]);
            swal("Success", res.data.message, "success");
          } else {
            setError(res.data.errors);
          }
        });
        break;

      case "razorpay":
        axios.post("/validate-order", data).then((res) => {
          if (res.data.status === true) {
            setError([""]);
            swal("Success", res.data.message, "success");
            var options = {
              key: "rzp_test_IQZryhDRwSHzz1",
              amount: totalCartPrice * 100,
              name: "Acme Corp",
              description: "Test Transaction",
              image: "http://127.0.0.1:8000/uploads/product/1674832103.png",
              callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
              handler: function (res) {
                console.log(res);
                data.payment_id = res.razorpay_payment_id;
                axios.post("/place-order", data).then((res) => {
                  if (res.data.status === true) {
                    setError([""]);
                    swal("Success", res.data.message, "success");
                  }
                });
              },
              prefill: {
                name: data.firstname + data.lastname,
                email: data.email,
                contact: data.mobile,
              },
              theme: {
                color: "#3399cc",
              },
            };
            var rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            setError(res.data.errors);
            swal("Warning", "All fields are mendatory!", "warning");
          }
        });
        break;
      case "paypal":
        axios.post("/validate-order", data).then((res) => {
          if (res.data.status === true) {
            setError([""]);
            // swal("Success", res.data.message, "success");
            var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
            myModal.show();
          } else {
            setError(res.data.errors);
            swal("Warning", "All fields are mendatory!", "warning");
          }
        });
        break;
      default:
        break;
    }
  };

  let totalCartPrice = 0;
  const loadData = () => {
    axios.get("/fetch-cart-data").then((res) => {
      if (res.data.status === true) {
        setCartData(res.data.data);
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  let checkout_HTML = "";
  if (cartData.length > 0) {
    checkout_HTML = (
      <div className="row mt-3">
        <div className="col-md-7">
          <div className="card">
            <div className="card-header">
              <h4>Basic Information</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(e) => submitOrder(e, "cod")}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.firstname}
                        name="firstname"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.firstname}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.lastname}
                        name="lastname"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.lastname}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Mobile</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.mobile}
                        name="mobile"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.mobile}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.email}
                        name="email"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.email}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Full Address</label>
                      <textarea
                        name="address"
                        onChange={handleInput}
                        value={checkoutInput.address}
                        className="form-control"
                      ></textarea>
                      <p className="text-danger">{errorList.address}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>City</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.city}
                        name="city"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.city}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>State Code</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.state_code}
                        name="state_code"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.state_code}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>ZIP Code</label>
                      <input
                        type="text"
                        onChange={handleInput}
                        value={checkoutInput.zip_code}
                        name="zip_code"
                        className="form-control"
                      />
                      <p className="text-danger">{errorList.zip_code}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button type="submit" className="btn btn-primary">
                        Place Order
                      </button>
                      <button
                        onClick={(e) => submitOrder(e, "razorpay")}
                        type="button"
                        className="mx-2 btn btn-success"
                      >
                        Pay By Razorpay
                      </button>
                      <button
                        onClick={(e) => submitOrder(e, "paypal")}
                        type="button"
                        className="mx-2 btn btn-info text-light"
                      >
                        Pay By Paypal
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th width="50%">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item, key) => {
                totalCartPrice += item.selling_price * item.quantity;
                return (
                  <tr key={key}>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.selling_price * item.quantity}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2" className="text-end fw-bold">
                  Grand Total
                </td>
                <td colSpan="2" className="text-end fw-bold">
                  {totalCartPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    checkout_HTML = (
      <div className="row mt-3 justify-content-center">
        <div className="col-md-10">
          <div className="card card-body py-5 text-center shadow-sm my-2">
            <h4>
              Your Shopping Cart is Empty! Please add something in cart for
              checkout!
            </h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div
        className="modal fade"
        id="payOnlineModal"
        tabindex="-1"
        aria-labelledby="payOnlineModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="payOnlineModalLabel">
                Pay Online
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
          </div>
        </div>
      </div>
      <div className="container">{checkout_HTML}</div>
    </div>
  );
};

export default Checkout;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Navbar from "../../../layouts/frontend/Navbar";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
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

  const handleDecrement = (id) => {
    setCartData((cartData) =>
      cartData.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
    updateCartQuantity(id, "dec");
  };

  const handleIncrement = (id) => {
    setCartData((cartData) =>
      cartData.map((item) =>
        id === item.id
          ? { ...item, quantity: item.quantity + (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
    updateCartQuantity(id, "inc");
  };

  function updateCartQuantity(cart_id, scope) {
    axios.put(`/update-cart/${cart_id}/${scope}`).then((res) => {
      if (res.data.status === true) {
        swal("Success", res.data.message, "success");
        loadData();
      }
    });
  }
  function removeItemFromCart(id) {
    axios.put(`/remove-item-from-cart/${id}`).then((res) => {
      if (res.data.status === true) {
        swal("Success", res.data.message, "success");
        loadData();
      }
    });
  }

  let cartItem = "";
  if (cartData.length > 0) {
    cartItem = (
      <div className="row justify-content-center">
        <div className="col-md-10 my-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-center">Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  (cartItem = cartData.map((item, key) => {
                    totalCartPrice += item.selling_price * item.quantity;
                    return (
                      <tr key={key}>
                        <td width="10%">
                          <img
                            src={"http://127.0.0.1:8000/" + item.image}
                            width="50px"
                            height="50px"
                            alt="Product"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td width="15%" className="text-center">
                          {item.selling_price}
                        </td>
                        <td width="15%" className="text-center">
                          <div className="input-group">
                            <button
                              type="button"
                              onClick={() => handleDecrement(item.id)}
                              className="input-group-text"
                            >
                              -
                            </button>
                            <div className="form-control text-center">
                              {item.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleIncrement(item.id)}
                              className="input-group-text"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td width="15%" className="text-center">
                          {item.quantity * item.selling_price}
                        </td>
                        <td width="10%">
                          <button
                            onClick={() => removeItemFromCart(item.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  }))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-4">
          <div className="card card-body mt-3">
            <h4>
              Sub Total:-
              <span className="float-end">{totalCartPrice}</span>
            </h4>
            <h4>
              Grand Total:-
              <span className="float-end">{totalCartPrice}</span>
            </h4>
            <hr />
            <Link to="/checkout" className="btn btn-primary">
              Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    cartItem = (
      <div>
        <div className="card card-body py-5 text-center shadow-sm my-2">
          <h4>Your Shopping Cart is Empty!</h4>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="row justify-content-center">{cartItem}</div>
    </div>
  );
};
export default Cart;

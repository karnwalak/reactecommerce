import axios from "axios";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
const OrderDetail = () => {
  const [orderData, setOrderData] = useState([]);
  var param = useParams();
  useEffect(() => {
    axios.get("/get-order-detail/" + param.id).then((res) => {
      if (res.data.status === true) {
        setOrderData(res.data.data);
      } else {
        swal("Warning", res.data.error, "warning");
      }
    });
  }, [param.id]);
  var allData = orderData.order_items;
  var order_HTML = '';
  let totalAmount=0;
    order_HTML = 
    allData?.map((val, key) => (
      totalAmount += val.quantity * val.price,
      <tr key={key}>
        <td>
          <img
            width="100px"
            height="50px"
            src={"http://127.0.0.1:8000/" + val.product.image}
            alt="Product"
          />
        </td>
        <td>{val.product.name}</td>
        <td>{val.quantity}</td>
        <td>{val.product.brand}</td>
        <td>{val.product.selling_price}</td>
      </tr>
    ))
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>Orders Details</h4>
                    </div>
                    <div className="card-body">
                      <div className="card my-3">
                        <div className="card-header">User Details</div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-12">
                              <table className="table table-bordered">
                                <tbody>
                                  <tr>
                                    <th>Tracking No</th>
                                    <td>{orderData.tracking_no}</td>
                                  </tr>
                                  <tr>
                                    <th>Name</th>
                                    <td>
                                      {orderData.firstname +
                                        " " +
                                        orderData.lastname}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th>Mobile</th>
                                    <td>{orderData.phone}</td>
                                  </tr>
                                  <tr>
                                    <th>Email</th>
                                    <td>{orderData.email}</td>
                                  </tr>
                                  <tr>
                                    <th>Address</th>
                                    <td>{orderData.address}</td>
                                  </tr>
                                  <tr>
                                    <th>City</th>
                                    <td>{orderData.city}</td>
                                  </tr>
                                  <tr>
                                    <th>ZipCode</th>
                                    <td>{orderData.zip_code}</td>
                                  </tr>
                                  <tr>
                                    <th>Status</th>
                                    <td>{orderData.status}</td>
                                  </tr>
                                  <tr>
                                    <th>Ordered On</th>
                                    <td>
                                      <Moment>{orderData.created_at}</Moment>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card my-2">
                        <div className="card-header">Product Detail</div>
                        <div className="card-body">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Product Image</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Brand</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order_HTML}
                              <tr>
                                <td colSpan="3"></td>
                                <th>Total Amount</th>
                                <td>{totalAmount}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Routes>
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

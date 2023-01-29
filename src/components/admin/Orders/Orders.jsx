import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";

const Orders = () => {
  const [orders, setOrder] = useState([""]);
  const loadDataOnlyOnce = () => {
    axios.get("/fetch-all-orders").then((data) => {
      if (data.data.status === true) {
        setOrder(data.data.data);
      }
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  let order_HTML = "";
  order_HTML = orders.map((val, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>{val.tracking_no}</td>
      <td>{val.phone}</td>
      <td>{val.email}</td>
      <td>
        <Link
          className="btn btn-primary btn-sm"
          to={`/admin/view-order-detail/${val.id}`}
        >
          <i className="fa fa-eye" aria-hidden="true"></i>
        </Link>
      </td>
    </tr>
  ));
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
                      <h4>Orders</h4>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>SI. No.</th>
                            <th>Tracking No</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>SI. No.</th>
                            <th>Tracking No</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>{order_HTML}</tbody>
                      </table>
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

export default Orders;

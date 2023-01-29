import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";

const Product = () => {
  const [item, setData] = useState([""]);
  const loadDataOnlyOnce = () => {
    axios.get("/fetch-all-products").then((data) => {
      if (data.data.status === true) {
        setData(data.data.data);
      }
    });
  };

  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const deleteProduct = (val) => {
    axios.get("/delete-product/" + val).then((data) => {
      if (data.data.status === true) {
        swal("Success", data.data.message, "success");
        loadDataOnlyOnce();
      }
    });
  };
  
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="card mb-4">
                    <div className="card-header">
                      <h2>Products List</h2>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>SI. No.</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Selling Price</th>
                            <th>Original Price</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>SI. No.</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Selling Price</th>
                            <th>Original Price</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </tfoot>
                        <tbody>
                          {item?.map((val, key) => (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{val.name}</td>
                              <td>{val.slug}</td>
                              <td>{val.selling_price}</td>
                              <td>{val.original_price}</td>
                              <td>{val.quantity}</td>
                              <td>{val.description}</td>
                              <td>{val.status === 1 ? "Hidden" : "Shown"}</td>
                              <td>
                                <Link
                                  className="btn btn-primary btn-sm"
                                  to={`/admin/view-product-detail/${val.id}`}
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                                <Link
                                  className="btn btn-success btn-sm mx-2"
                                  to={`/admin/edit-product/${val.id}`}
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    deleteProduct(val.id);
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default Product;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";

const ProductDetail = () => {
    const [item, setData] = useState([""]);
    let param = useParams();

    useEffect(() => {
      axios.get("/get-single-product/" + param.id).then((data) => {
        if (data.data.status === true) {
          setData(data.data.data[0]);
        }
      });
    }, []);
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
                      <h2>Products Detail</h2>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <tr>
                          <th>Product Name:-</th>
                          <td>{item.name}</td>
                        </tr>
                        <tr>
                          <th>Brand:-</th>
                          <td>{item.brand}</td>
                        </tr>
                        <tr>
                          <th>Category Name:-</th>
                          <td>{item.category_name}</td>
                        </tr>
                        <tr>
                          <th>Description:-</th>
                          <td>{item.description}</td>
                        </tr>
                        <tr>
                          <th>Product Image:-</th>
                          <td>
                            <img
                              width="20%"
                              src={"http://127.0.0.1:8000/" + item.image}
                              alt="Product"
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Selling Price:-</th>
                          <td>{item.selling_price}</td>
                        </tr>
                        <tr>
                          <th>Original Price:-</th>
                          <td>{item.original_price}</td>
                        </tr>
                        <tr>
                          <th>Quantity:-</th>
                          <td>{item.quantity}</td>
                        </tr>
                      </table>
                      <Link
                        to={`/admin/edit-product/${item.id}`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/admin/view-product"
                        className="btn btn-primary mx-2 btn-sm"
                      >
                        Back
                      </Link>
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

export default ProductDetail;

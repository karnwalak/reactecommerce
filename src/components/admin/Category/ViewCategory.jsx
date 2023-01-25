import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";

const ViewCategory = () => {
  const [item, setData] = useState([""]);
  const loadDataOnlyOnce = () => {
    axios.get("/view-category").then((data) => {
      if (data.data.status === true) {
        setData(data.data.data);
      }
    });
  }

  useEffect(() => {
    loadDataOnlyOnce();
  }, []);

  const deleteCategory=(val)=>{
    axios.get("/delete-category/"+val).then((data) => {
      if (data.data.status === true) {
        swal("Success",data.data.message,"success");
        loadDataOnlyOnce();
      }
    });
  }
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
                      <h2>Category List</h2>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>SI. No.</th>
                            <th>Name</th>
                            <th>Slug</th>
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
                              <td>{val.description}</td>
                              <td>{val.status == 1 ? "Hidden" : "Shown"}</td>
                              <td>
                                <Link
                                  className="btn btn-success"
                                  to={`/admin/edit-category/${val.id}`}
                                >
                                  Edit
                                </Link>
                                <button type="button"
                                  className="btn btn-danger mx-2"
                                  onClick={()=>{deleteCategory(val.id);}}
                                >
                                  Delete
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
export default ViewCategory;

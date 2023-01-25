import axios from "axios";
import React, { useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import swal from "sweetalert";

const Category = () => {
  const navigate = useNavigate();
  const [inputData, setData] = useState([""]);
  const [erroList, setError] = useState([""]);
  const [isChecked, setIsChecked] = useState(false);

  const handleInput = (e) => {
    e.persist();
    setIsChecked(e.target.checked);
    setData({ ...inputData, [e.target.name]: e.target.value });
  };

  const submitCategory = (e) => {
    e.preventDefault();
    axios
      .post("/add-category", inputData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.data.status == false) {
          setError(res.data.errors);
        } else {
          setError([""]);
          swal("Success", res.data.message, "success");

          navigate("/admin/view-category");
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
                  <div className="card">
                    <div className="card-header">
                      <h2>Add Category</h2>
                    </div>
                    <div className="card-body">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="home-tab-pane"
                            aria-selected="true"
                          >
                            Home
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="seo-tags-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#seo-tags-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="seo-tags-tab-pane"
                            aria-selected="false"
                          >
                            SEO Tags
                          </button>
                        </li>
                      </ul>
                      <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane card-body border fade show active"
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            tabindex="0"
                          >
                            <div className="form-group mb-3">
                              <label>Slug</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={inputData.slug}
                                name="slug"
                                className="form-control"
                              />
                              <span className="text-danger">
                                {erroList.slug}
                              </span>
                            </div>
                            <div className="form-group mb-3">
                              <label>Name</label>
                              <input
                                type="text"
                                onChange={handleInput}
                                value={inputData.name}
                                name="name"
                                className="form-control"
                              />
                              <span className="text-danger">
                                {erroList.name}
                              </span>
                            </div>
                            <div className="form-group mb-3">
                              <label>Description</label>
                              <textarea
                                onChange={handleInput}
                                value={inputData.description}
                                name="description"
                                className="form-control"
                              ></textarea>
                              <span className="text-danger">
                                {erroList.description}
                              </span>
                            </div>
                            <div className="form-group mb-3">
                              <label>Status</label>
                              <br />
                              <input
                                type="checkbox"
                                onChange={handleInput}
                                checked={isChecked}
                                name="status"
                              />{" "}
                              1-Hidden/0-Shown
                            </div>
                          </div>
                          <div
                            className="tab-pane card-body border fade"
                            id="seo-tags-tab-pane"
                            role="tabpanel"
                            aria-labelledby="seo-tags-tab"
                            tabindex="0"
                          >
                            <div className="form-group mb-3">
                              <label>Meta Title</label>
                              <input
                                type="text"
                                className="form-control"
                                onChange={handleInput}
                                value={inputData.meta_title}
                                name="meta_title"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label>Meta Keyword</label>
                              <textarea
                                className="form-control"
                                onChange={handleInput}
                                value={inputData.meta_keyword}
                                name="meta_keyword"
                              ></textarea>
                            </div>
                            <div className="form-group mb-3">
                              <label>Meta Description</label>
                              <textarea
                                className="form-control"
                                onChange={handleInput}
                                value={inputData.meta_description}
                                name="meta_description"
                              ></textarea>
                            </div>
                          </div>
                          <button className="btn btn-success float-end my-3 mx-2">
                            Submit
                          </button>
                        </div>
                      </form>
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
export default Category;

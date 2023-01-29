import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import Navbar from "../../../layouts/admin/Navbar";
import Sidebar from "../../../layouts/admin/Sidebar";
import swal from "sweetalert";
import axios from "axios";

const EditProduct = () => {
  const navigate = useNavigate();
  const [inputData, setData] = useState({
    category_id: "",
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    selling_price: "",
    original_price: "",
    quantity: "",
    brand: "",
    status: "",
    featured: "",
    popular: "",
  });

  const [allcheckbox, setCheckbox] = useState([]);
  const handleCheckbox = (e) => {
    e.persist();
    setCheckbox({ ...allcheckbox, [e.target.name]: e.target.checked });
  };
  const [picture, setPicture] = useState([]);

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const [category, setCategory] = useState([]);
  const [erroList, setError] = useState([""]);
  let param = useParams();
  const loadDataOnlyOnce = () => {
    axios.get("/get-single-product/" + param.id).then((data) => {
      if (data.data.status === true) {
        setData(data.data.data[0]);
        setCheckbox({
          'featured':data.data.data[0].featured,
          'popular':data.data.data[0].popular,
          'status':data.data.data[0].status
        });
        setPicture(data.data.data[0].image);
      }
    });
  };
  const {
    id,
    category_id,
    slug,
    name,
    description,
    meta_title,
    meta_keyword,
    meta_description,
    selling_price,
    original_price,
    quantity,
    brand,
    status,
    featured,
    popular,
  } = inputData;
  useEffect(() => {
    loadDataOnlyOnce();
    axios.get("/fetch-category").then((res) => {
      if (res.data.status === true) {
        setCategory(res.data.data);
      }
    });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setData({ ...inputData, [e.target.name]: e.target.value });
  };
  const submitCategory = (e) => {
    // console.log(allcheckbox);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("id", param.id);
    formData.append("category_id", inputData.category_id);
    formData.append("name", inputData.name);
    formData.append("slug", inputData.slug);
    formData.append("description", inputData.description);
    formData.append("meta_title", inputData.meta_title);
    formData.append("meta_keyword", inputData.meta_keyword);
    formData.append("meta_description", inputData.meta_description);
    formData.append("selling_price", inputData.selling_price);
    formData.append("original_price", inputData.original_price);
    formData.append("quantity", inputData.quantity);
    formData.append("brand", inputData.brand);
    formData.append("featured", allcheckbox.featured ? "1" : "0");
    formData.append("status", allcheckbox.status ? "1" : "0");
    formData.append("popular", allcheckbox.popular ? "1" : "0");
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios.post("/update-product", formData, config).then((res) => {
      if (res.data.status === true) {
        swal("Success", res.data.message, "success");
        navigate("/admin/view-product");
      } else {
        swal("Warning", "All fields are mendatory!", "warning");
        setError(res.data.errors);
      }
    });
    // console.log(allcheckbox);
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
                      <h2>Edit Product</h2>
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
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="od-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#od-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="od-tab-pane"
                            aria-selected="false"
                          >
                            Other Details
                          </button>
                        </li>
                      </ul>
                      <form onSubmit={submitCategory}>
                        <input type="hidden" name="id" value={id} />
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane card-body border fade show active"
                            id="home-tab-pane"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                            tabIndex="0"
                          >
                            <div className="form-group mb-3">
                              <label>Select Category</label>
                              <select
                                name="category_id"
                                onChange={handleInput}
                                value={inputData.category_id}
                                className="form-control"
                              >
                                <option value="">Select Category</option>
                                {category.map((item) => (
                                  <option value={item.id} key={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <span className="text-danger">
                                {erroList.category_id}
                              </span>
                            </div>
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
                          </div>
                          <div
                            className="tab-pane card-body border fade"
                            id="seo-tags-tab-pane"
                            role="tabpanel"
                            aria-labelledby="seo-tags-tab"
                            tabIndex="0"
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
                              <span className="text-danger">
                                {erroList.meta_title}
                              </span>
                            </div>
                            <div className="form-group mb-3">
                              <label>Meta Keyword</label>
                              <textarea
                                className="form-control"
                                onChange={handleInput}
                                value={inputData.meta_keyword}
                                name="meta_keyword"
                              ></textarea>
                              <span className="text-danger">
                                {erroList.meta_keyword}
                              </span>
                            </div>
                            <div className="form-group mb-3">
                              <label>Meta Description</label>
                              <textarea
                                className="form-control"
                                onChange={handleInput}
                                value={inputData.meta_description}
                                name="meta_description"
                              ></textarea>
                              <span className="text-danger">
                                {erroList.meta_description}
                              </span>
                            </div>
                          </div>
                          <div
                            className="tab-pane card-body border fade"
                            id="od-tab-pane"
                            role="tabpanel"
                            aria-labelledby="od-tab"
                            tabIndex="0"
                          >
                            <div className="row">
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Selling Price</label>
                                <input
                                  type="text"
                                  name="selling_price"
                                  onChange={handleInput}
                                  value={inputData.selling_price}
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  {erroList.selling_price}
                                </span>
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Original Price</label>
                                <input
                                  type="text"
                                  onChange={handleInput}
                                  value={inputData.original_price}
                                  name="original_price"
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  {erroList.original_price}
                                </span>
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Quantity</label>
                                <input
                                  type="text"
                                  onChange={handleInput}
                                  value={inputData.quantity}
                                  name="quantity"
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  {erroList.quantity}
                                </span>
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Brand</label>
                                <input
                                  onChange={handleInput}
                                  value={inputData.brand}
                                  name="brand"
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  {erroList.brand}
                                </span>
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Image</label>
                                <input
                                  type="file"
                                  name="image"
                                  onChange={handleImage}
                                  className="form-control"
                                />
                                <span className="text-danger">
                                  {erroList.image}
                                </span>
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <img
                                  width="20%"
                                  src={"http://127.0.0.1:8000/" + picture}
                                />
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Feature (checked=shown)</label>
                                <input
                                  type="checkbox"
                                  name="featured"
                                  onChange={handleCheckbox}
                                  defaultChecked={
                                    allcheckbox.featured === 1 ? 'checked' : ''
                                  }
                                  className="w-50 h-50"
                                />
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Popular (checked=shown)</label>
                                <input
                                  type="checkbox"
                                  name="popular"
                                  onChange={handleCheckbox}
                                  defaultChecked={
                                    allcheckbox.popular === 1 ? 'checked' : ''
                                  }
                                  className="w-50 h-50"
                                />
                              </div>
                              <div className="form-group col-4 col-md-4 mb-3">
                                <label>Status(checked=hidden)</label>
                                <input
                                  type="checkbox"
                                  name="status"
                                  onChange={handleCheckbox}
                                  defaultChecked={
                                    allcheckbox.status === 1 ? 'checked' : ''
                                  }
                                  className="w-50 h-50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success float-end my-3 mx-2"
                        >
                          Update
                        </button>
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

export default EditProduct;

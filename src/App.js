import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/admin/Profile";
import Register from "./components/frontend/auth/Register";
import Login from "./components/frontend/auth/Login";
import Main from "./layouts/admin/Main";
import Home from "./components/frontend/Home";
import axios from "axios";
import Protected from "./components/Protected";
import AdminProtected from "./components/admin/AdminProtected";
import Category from "./components/admin/Category/Category";
import ViewCategory from "./components/admin/Category/ViewCategory";
import EditCategory from "./components/admin/Category/EditCategory";
import Product from "./components/admin/Product/Product";
import AddProduct from "./components/admin/Product/AddProduct";
import EditProduct from "./components/admin/Product/EditProduct";
import ProductDetail from "./components/admin/Product/ProductDetail";
import About from "./components/frontend/About";
import Contact from "./components/frontend/Contact";
import ViewCategoryCollection from "./components/frontend/Collection/ViewCategoryCollection";
import ViewProduct from "./components/frontend/Collection/ViewProduct";
import ViewSingleProduct from "./components/frontend/Collection/ViewSingleProduct";
import Cart from "./components/frontend/Collection/Cart";
import Checkout from "./components/frontend/Collection/Checkout";
import Orders from "./components/admin/Orders/Orders";
import OrderDetail from "./components/admin/Orders/OrderDetail";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route
            path="/checkout"
            element={<Protected Component={Checkout} />}
          />
          <Route
            path="/show-cart-item"
            element={<Protected Component={Cart} />}
          />
          <Route
            path="/collections"
            element={<Protected Component={ViewCategoryCollection} />}
          />
          <Route
            path="/collections/:slug"
            element={<Protected Component={ViewProduct} />}
          />
          <Route
            path="/collections/:slug/:id"
            element={<Protected Component={ViewSingleProduct} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminProtected Component={Main} />} />
          <Route
            path="/admin/dashboard"
            element={<AdminProtected Component={Main} />}
          />
          <Route
            path="/admin/profile"
            element={<AdminProtected Component={Profile} />}
          />
          <Route
            path="/admin/add-category"
            element={<AdminProtected Component={Category} />}
          />
          <Route
            path="/admin/view-category"
            element={<AdminProtected Component={ViewCategory} />}
          />
          <Route
            path="/admin/edit-category/:id"
            element={<AdminProtected Component={EditCategory} />}
          />
          <Route
            path="/admin/add-product"
            element={<AdminProtected Component={AddProduct} />}
          />
          <Route
            path="/admin/view-product"
            element={<AdminProtected Component={Product} />}
          />
          <Route
            path="/admin/edit-product/:id"
            element={<AdminProtected Component={EditProduct} />}
          />
          <Route
            path="/admin/view-product-detail/:id"
            element={<AdminProtected Component={ProductDetail} />}
          />
          <Route
            path="/admin/orders"
            element={<AdminProtected Component={Orders} />}
          />
          <Route
            path="/admin/view-order-detail/:id"
            element={<AdminProtected Component={OrderDetail} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

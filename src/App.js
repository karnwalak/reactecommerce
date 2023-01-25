import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from "./components/admin/Profile";
import Register from './components/frontend/auth/Register';
import Login from './components/frontend/auth/Login';
import Main from './layouts/admin/Main';
import Home from './components/frontend/Home';
import axios from 'axios';
import Protected from './components/Protected';
import AdminProtected from './components/admin/AdminProtected';
import Category from "./components/admin/Category/Category";
import ViewCategory from "./components/admin/Category/ViewCategory";
import EditCategory from "./components/admin/Category/EditCategory";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Protected Component={Home} />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

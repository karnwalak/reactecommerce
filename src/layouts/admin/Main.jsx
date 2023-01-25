import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import Dashboard from "../../components/admin/Dashboard";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Main = () => {
  return (
    <div className="sb-nav-fixed">
      <Navbar />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Dashboard />
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

export default Main;

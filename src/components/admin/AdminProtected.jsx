import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AdminProtected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!token) {
      swal("Warning", "Unathourized Access!", "warning");
      navigate("/login");
    }else if(token && role != 1){
      swal("Warning", "Only Admin Can Access This Section!", "warning");
      navigate("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};
export default AdminProtected;

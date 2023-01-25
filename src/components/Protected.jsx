import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Protected = (props) => {
  const {Component} = props;
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem('token');
    if(!token){
      swal('Warning','Unathourized Access!','warning');
      navigate('/login');
    }
  });
   return (
    <div>
      <Component />
    </div>
   )
}
export default Protected;
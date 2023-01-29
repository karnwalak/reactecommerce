import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import img from '../../../assets/mobile.png';
import axios from "axios";
const ViewCategoryCollection = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
    axios.get('/fetch-category').then((res)=>{
      if(res.data.status === true){
        setData(res.data.data);
      }
    })
  },[]);
  var showCategoryList = '';
  showCategoryList = data.map((item, idx) => {
    return (
      <div className="col-md-4 text-center" key={idx}>
        <div className="card">
          <div className="card-body">
            <Link to={item.slug}>
              <img width="30%" src={img} alt={item.slug} />
            </Link>
            <p>
              <Link to={item.slug} className="h5">
                {item.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">{showCategoryList}</div>
      </div>
    </div>
  );
};

export default ViewCategoryCollection;

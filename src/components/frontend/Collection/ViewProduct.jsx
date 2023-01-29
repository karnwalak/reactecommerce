import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
const ViewProduct = () => {
  let param = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/fetch-products?slug=" + param.slug).then((res) => {
      if (res.data.status === true) {
        setData(res.data.data);
      }
    });
  }, []);
  var showProductList = "";
  if(data.length>0){
    showProductList = data.map((item, idx) => {
      return (
        <div className="col-md-4 text-center" key={idx}>
          <div className="card">
            <div className="card-body">
              <Link to={"/collections/" + param.slug + "/" + item.id}>
                <img
                  width="30%"
                  src={"http://127.0.0.1:8000/" + item.image}
                  alt={item.slug}
                />
              </Link>
              <p>
                <Link
                  to={"/collections/" + param.slug + "/" + item.id}
                  className="h5"
                >
                  {item.name}
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    });
  }else{
    var showProductList = (
      <div className="col-md-6 text-center">
        <div className="card">
          <div className="card-body">
            <h1>No Product Found!</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">{showProductList}</div>
      </div>
    </div>
  );
};

export default ViewProduct;

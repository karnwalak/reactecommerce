import React, { useEffect, useState } from "react";
import { useParams,Link } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from "axios";
import swal from "sweetalert";
const ViewSingleProduct = () => {
  let param = useParams();
  const [data, setData] = useState([]);
  const [value,setValue]=useState(1);
  
  const handleDecrement = (e) => {
    if(value > 1){
      setValue(prevCount => prevCount - 1);
    }
  }
  const handleIncrement = (e) => {
    if(value < 10){
      setValue((prevCount) => prevCount + 1);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    let cartdata = {
      product_id:data.id,
      quantity:value
    }
    axios.post('/add-to-cart',cartdata).then((res)=>{
      if(res.data.status===true){
        swal("Success",res.data.message,'success');
      }else{
        swal("Warning",res.data.error,'warning')
      }
    })
  };
  
  
  useEffect(() => {
    axios.get("/get-single-product/" + param.id).then((res) => {
      if (res.data.status === true) {
        setData(res.data.data[0]);
      }
    });
  }, []);
  let stock='';
  if (data.quantity > 0) {
    stock = (
      <div>
        <label className="btn-sm btn-success px-4 mt-2">In Stock</label>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="input-group">
              <button
                type="button"
                onClick={handleDecrement}
                className="input-group-text"
              >
                -
              </button>
              <div className="form-control text-center">{value}</div>
              <button
                type="button"
                onClick={handleIncrement}
                className="input-group-text"
              >
                +
              </button>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <button type="button" onClick={addToCart} className="btn btn-primary w-100">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }else{
    stock = <label className="btn-sm btn-danger px-4 mt-2">Out Of Stock</label>;
  }
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-4 border-end">
            <img width="80%" src={"http://127.0.0.1:8000/" + data.image} />
          </div>
          <div className="col-md-8 py-5">
            <h4>
              {data.name}
              <span className="float-end badge btn-sm btn-danger badge-pil">
                {data.brand}
              </span>
            </h4>
            <p>{data.description}</p>
            <h4 className="mb-1">
              Rs: {data.selling_price}
              <s className="ms-2">Rs: {data.original_price}</s>
            </h4>
            <div>
              {stock}
              
            </div>
            <button type="button" className="btn btn-danger mt-3">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSingleProduct;

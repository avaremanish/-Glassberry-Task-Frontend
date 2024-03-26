import React, { useState } from 'react'
import "../create/createproduct.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateProduct() {

  const [name, setName] = useState()
  const [features, setFeatures] = useState()
  const [description, setDescription] = useState()
  const navigate = useNavigate();


  
const Submit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/createProduct", {name, features, description})
  .then(result =>{ 
    
    console.log(result)
    navigate('/')
  
  })
  .catch(err => console.log(err))
}

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Submit}>
          <h2> Add Product</h2>
          <div className="mb-2">
            <label htmlFor="" className="font-weight-bold">
              {" "}
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Features </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Description</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Submit </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct
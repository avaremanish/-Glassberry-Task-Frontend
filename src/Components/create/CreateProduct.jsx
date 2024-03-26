import React from 'react'
import "../create/createproduct.css";


function CreateProduct() {
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2> Add Product</h2>
          <div className="mb-2">
            <label htmlFor="" className='font-weight-bold' >
              {" "}
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Features </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Description</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
            />
          </div>

          <button className="btn btn-success">Submit </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct
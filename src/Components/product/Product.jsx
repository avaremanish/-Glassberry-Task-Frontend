import React, { useState } from 'react'
import "../product/product.css";
import { Link } from 'react-router-dom';

const Product = () => {

  const [product , setProduct] = useState([
    {
    name: "iphone" , features:"camera" , description:" best Mobile phone"
    },
    {
    name: "DSLR" , features:"DSLR-camera" , description:" best camera"
    },
    {
    name: "macbook" , features:"laptop" , description:" best laptop"
    },

]);
  return (
    <div className="d-flex vh-100 p-3 mb-2 bg-dark text-white justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +{" "}
        </Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Features</th>
              <th>Product Description </th>
              {/* <th>Product Images</th>
              <th>Product Category</th>
              <th>Product Sub-category</th>
              <th>Product Brand</th>
              <th>Publish Date</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => {
              return (
                <tr>
                  <td> {product.name}</td>
                  <td> {product.features}</td>
                  <td> {product.description}</td>
                  <td>
                    {" "}
                 
                  
                 <Link to="/update"  class="btn btn-primary">
        Edit
        </Link>
                    <button type="button" class="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product
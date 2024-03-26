import React, { useEffect, useState } from 'react'
import "../product/product.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {

  const [product , setProduct] = useState([]);

useEffect (() =>{
      axios.get('http://localhost:3001')
      .then(result => setProduct(result.data))
      .catch(err => console.log(err))
},[])


const handleDelete = (id) => {
  axios
    .delete("http://localhost:3001/deleteProduct/" + id)
    .then((res) => {console.log(res)
            window.location.reload()
    })
    .catch((err) => console.log(err));
};

  return (
    <div className="d-flex vh-100 p-3 mb-2 bg-dark text-white justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +{" "}
        </Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Features</th>
              <th>Product Description </th>
              <th>Product Images</th>
              <th>Product Category</th>
              <th>Product Sub-category</th>
              <th>Product Brand</th>
              <th>Publish Date</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((product) => {
              return (
                <tr>
                  <td> {product.name}</td>
                  <td> {product.features}</td>
                  <td> {product.description}</td>
                  <td> {product.image}</td>
                  <td> {product.category}</td>
                  <td> {product.subcategory}</td>
                  <td> {product.brand}</td>
                  <td> {product.date}</td>
                  <td className="w-25 ">
                    {" "}
                    <Link to={`/update/${product._id}`} class="btn btn-primary">
                      Edit
                    </Link>
                    <button type="button" class="btn btn-warning">
                      Preview
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={(e) => handleDelete(product._id)}>
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
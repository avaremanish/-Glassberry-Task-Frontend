import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setProducts(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteProduct/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handlePreview = (product) => {
    setPreviewData(product);
  };

  const handleClosePreview = () => {
    setPreviewData(null);
  };

  return (
    <div>
      <div className="d-flex vh-100 p-3 mb-2 bg-dark text-white justify-content-center align-items-center">
        <div className="w-80 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Features</th>
                <th>Product Description</th>
                <th>Product Images</th>
                <th>Product Category</th>
                <th>Product Sub-category</th>
                <th>Product Brand</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.features}</td>
                  <td>{product.description}</td>
                  <td>{product.image}</td>
                  <td>{product.category}</td>
                  <td>{product.subcategory}</td>
                  <td>{product.brand}</td>
                  <td>{product.date}</td>
                  <td className="w-25">
                    <Link
                      to={`/update/${product._id}`}
                      className="btn btn-primary">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handlePreview(product)}>
                      Preview
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {previewData && (
          <div className="preview-modal w-50 alert alert-warning">
            <div className="preview-content">
              <span className="close" onClick={handleClosePreview}>
                &times;
              </span>
              <h2>Preview</h2>
              <p>Name: {previewData.name}</p>
              <p>Features: {previewData.features}</p>
              <p>Description: {previewData.description}</p>
              <p>Image: {previewData.image}</p>
              <p>Category: {previewData.category}</p>
              <p>Subcategory: {previewData.subcategory}</p>
              <p>Brand: {previewData.brand}</p>
              <p>Date: {previewData.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

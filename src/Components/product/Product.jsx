import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../product/product.css"

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
    <>
      <div className="d-flex vh-100 p-3 mb-2 bg-dark text-white justify-content-center align-items-center">
        <div className="Context-box w-60 bg-white rounded p-3">
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
          <table className="table table-hover">
            <thead className="">
              <tr>
                <th scope="row">Product Name</th>
                <th>Product Features</th>
                <th>Product Description</th>
                <th> Images</th>
                <th>Category</th>
                <th>Sub-category</th>
                <th> Brand</th>
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
                  <td className="Action-Buttons">
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
          <div className="Popover preview-modal w-50 alert alert-warning ">
            <div className="preview-content">
              <div className="Popover-Head">
                <div>
                  {" "}
                  <span className="close" onClick={handleClosePreview}>
                    X
                  </span>
                </div>
                <div className="Header">Preview</div>{" "}
              </div>

              <div class="container">
                <div class="card">
                  <div class="container-fliud">
                    <div class="wrapper row">
                      <div class="preview col-md-6">
                        <div class="preview-pic tab-content">
                          <div> Image: {previewData.image} </div>
                        </div>
                        <ul class="preview-thumbnail nav nav-tabs">
                          <li class="active img-thumbnail">
                            <a data-target="#pic-1" data-toggle="tab">
                              <img src="" />
                            </a>
                          </li>
                          <li>
                            <a data-target="#pic-2" data-toggle="tab">
                              <img src="http://placekitten.com/200/126" />
                            </a>
                          </li>
                          <li>
                            <a data-target="#pic-3" data-toggle="tab">
                              <img src="http://placekitten.com/200/126" />
                            </a>
                          </li>
                          <li>
                            <a data-target="#pic-4" data-toggle="tab">
                              <img src="http://placekitten.com/200/126" />
                            </a>
                          </li>
                          <li>
                            <a data-target="#pic-5" data-toggle="tab">
                              <img src="http://placekitten.com/200/126" />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="details col-md-6 ">
                        <h3 class="product-title"> {previewData.name} </h3>
                        <h5>Brand: {previewData.brand}</h5>
                        <p className="product-description">
                          Desctiption: {previewData.description}
                        </p>
                        <h4 class="price">Features</h4>
                        <p class="vote">
                          <strong>{previewData.features}</strong>
                          {/* <strong>(87 votes)</strong> */}
                        </p>
                        <h5 class="sizes">
                          Category :
                          <span
                            class="size"
                            data-toggle="tooltip"
                            title="small">
                            - {previewData.category}
                          </span>
                        </h5>
                        <h5 class="colors">
                          Sub-Category :
                          <span
                            class="color orange not-available"
                            data-toggle="tooltip"
                            title="Not In store">
                            {" "}
                            {previewData.subcategory}
                          </span>
                          <span class="color green"></span>
                          <span class="color blue"></span>
                        </h5>
                        <div class="action">
                          <button
                            class="add-to-cart btn btn-default"
                            type="button">
                            Date:
                          </button>
                          <button class="like btn btn-default" type="button">
                            <span class="fa fa-heart"> {previewData.date}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;

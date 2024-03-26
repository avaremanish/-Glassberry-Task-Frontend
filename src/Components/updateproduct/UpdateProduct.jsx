import React, { useEffect, useState } from 'react'
import "../updateproduct/updateproduct.css";
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduct = () => {

           const{id} = useParams()
            const [name, setName] = useState();
            const [features, setFeatures] = useState();
            const [description, setDescription] = useState();
            const navigate = useNavigate();
     
            useEffect(() => {
              axios
                .get("http://localhost:3001")
                .then((result) => setProduct(result.data))
                .catch((err) => console.log(err));
            }, []);


  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form>
          <h2> Update Product Details</h2>
          <div className="mb-2">
            <label htmlFor="" className="font-weight-bold">
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

          <button className="btn btn-success">Update </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct
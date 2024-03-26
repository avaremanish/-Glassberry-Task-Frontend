import React, { useEffect, useState } from 'react'
import "../updateproduct/updateproduct.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const UpdateProduct = () => {

           const{id} = useParams()
            const [name, setName] = useState();
            const [features, setFeatures] = useState();
            const [description, setDescription] = useState();
            const navigate = useNavigate();
     
            useEffect(() => {
              axios
                .get('http://localhost:3001/getProduct/'+id)
                .then(result => {console.log(result)
                      setName(result.data.name)
                      setFeatures(result.data.features)
                      setDescription(result.data.description)

                })
                .catch(err => console.log(err))
            }, []);

const Update = (e) => {
  e.preventDefault();
  axios.put("http://localhost:3001/updateProduct/"+id, {
      name,
      features,
      description

    })
    .then(result => {
      console.log(result);
      navigate("/");
    })
    .catch(err => console.log(err));
};

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={Update}>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Features </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Description</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="btn btn-success" onSubmit={Update}>
            Update{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct
import React, { useEffect, useState } from 'react'
import "../updateproduct/updateproduct.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const UpdateProduct = () => {

           const{id} = useParams()
            const [name, setName] = useState();
            const [features, setFeatures] = useState();
            const [description, setDescription] = useState();
             const [image, setImage] = useState();
             const [category, setCategory] = useState();
             const [subcategory, setSubcategory] = useState();
             const [brand, setBrand] = useState();
             const [date, setDate] = useState();
            const navigate = useNavigate();
     
            useEffect(() => {
              axios
                .get('http://localhost:3001/getProduct/'+id)
                .then(result => {console.log(result)
                      setName(result.data.name)
                      setFeatures(result.data.features)
                      setDescription(result.data.description)
                      setImage(result.data.image)
                      setCategory(result.data.category)
                      setSubcategory(result.data.subcategory)
                      setBrand(result.data.brand)
                      setDate(result.data.date)

                })
                .catch(err => console.log(err))
            }, []);

const Update = (e) => {
  e.preventDefault();
  axios
    .put("http://localhost:3001/updateProduct/" + id, {
      name,
      features,
      description,
      image,
      category,
      subcategory,
      brand,
      date,
    })
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((err) => console.log(err));
};

 const handleEditorChange = (event, editor) => {
   const content = editor.getData();
   const strippedContent = content
     .replace(/<p>/g, "") // Remove <p> tags
     .replace(/<\/p>/g, "") // Remove </p> tags
     .replace(/&nbsp;/g, " "); // Replace &nbsp; with space
   setDescription(strippedContent.trim()); // Update the state with stripped content
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

            <CKEditor
              // editor={ClassicEditor}
              //                 config={{
              //                     placeholder: 'Product Description',
              //                 }}
              //                 data={description} // Set initial data for CKEditor
              //                 onChange={handleEditorChange}
              editor={ClassicEditor}
              config={{
                placeholder: "Product Description",
              }}
              // value={description}
              onChange={handleEditorChange}
              data={description} // Set initial data for CKEditor
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onBlur={(e, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(e, editor) => {
                console.log("Focus.", editor);
              }}
            />

            {/* <label htmlFor=""> Product Description</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> */}
          </div>

          {/* Product Image */}
          <div className="mb-2">
            <label htmlFor=""> Product Image</label>
            <input
              type="text"
              placeholder="Enter Product Image"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {/* Product Category */}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Product Category
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option selected>Choose...</option>
              <option value="Alphabets">A-Z</option>
              <option value="Numbers">1-9</option>
              <option value="Symbols">!-*</option>
            </select>
          </div>
          {/* Sub-category  */}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Product Sub-category
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}>
              <option selected>Choose...</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </select>
          </div>
          {/* Product Brand */}
          <div className="mb-2">
            <label htmlFor=""> Product Brand</label>
            <input
              type="text"
              placeholder="Enter Brand Name"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
             
            />
          </div>
          {/* Product Date */}
          <div className="mb-2">
            <label htmlFor=""> Product Date</label>
            <input
              type="date"
              placeholder="Enter Product Name"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
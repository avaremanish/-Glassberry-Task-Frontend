import React, { useState } from 'react'
import "../create/createproduct.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


function CreateProduct() {

  const categories = [
    {
      name: "Alphabets",
      subcategories: ["A", "B", "C"],
    },
    {
      name: "Numbers",
      subcategories: ["1", "2", "3"],
    },
    {
      name: "Symbols",
      subcategories: ["!", "@", "#"],
    },
  ];



  const [name, setName] = useState('')
  const [features, setFeatures] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [brand, setBrand] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();



const Submit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:3001/createProduct", {
    name, 
    features,
    description,
    image,
    category,
    subcategory,
    brand,
    date
  })
  .then(result =>{ 
    
    console.log(result)
    navigate('/')
  
  })
  .catch(err => console.log(err))
}
 const handleEditorChange = (event, editor) => {
   const content = editor.getData();
   const strippedContent = content
     .replace(/<p>/g, "") // Remove <p> tags
     .replace(/<\/p>/g, "") // Remove </p> tags
     .replace(/&nbsp;/g, " "); // Replace &nbsp; with space
   setDescription(strippedContent.trim()); // Update the state with stripped content
 };

   const handleCategoryChange = (e) => {
     setCategory(e.target.value);
     setSubcategory(""); // Reset sub-category when category changes
   };

  //  const handleImage=(e) =>{
  //   console.log(e.target.files);
  //       setImage(e.target.files[null])

  //  }

const handleImage = async (e) => {
  const file = e.target.files[0]; // Get the first file from the FileList
  if (file && images.length >= 3) {
    // Check if less than 3 images are uploaded
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_cloudinary_upload_preset");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;

      // Add the image URL to the images array
      setImages([...images, imageUrl]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  } else {
    alert("You can upload a maximum of 3 images.");
  }
};



  return (
    <div className="Create-Product d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white p-3 Form-Box">
        <form onSubmit={Submit} className='Form'>
          <h2> Add Product</h2>
          {/* Product Name */}
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
          {/* Product Features */}
          <div className="mb-2">
            <label htmlFor=""> Product Features </label>
            <input
              type="text"
              placeholder="Enter Product Features"
              className="form-control"
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
          {/* Product Description */}

          <div className="mb-2">
            <label htmlFor=""> Product Description</label>

            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "Product Description",
              }}
              onChange={handleEditorChange}
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
            {/* <input
              id="editor"
              type="text"
              placeholder="Enter Product Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            /> */}
          </div>

          {/* Product Image */}
          <div className="mb-2">
            <label htmlFor=""> Product Image : </label> <br/>
            <input
              type="file"
              multiple
              className="file"
              // onChange={(e) => setImage(e.target.files[0])}
              onChange={handleImage}
            />
            {/* <input
              type="text"
              placeholder="Enter Product Image"
              className="form-control"
              onChange={(e) => setImage(e.target.value)}
            /> */}
          </div>
          <div className="mb-2">
            <label htmlFor=""> Product Category: </label> <br/>
            <select
              className="custom-select"
              onChange={handleCategoryChange}
              value={category}>
              <option value="">Choose...</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {/* Sub-category  */}
          <div className="mb-2">
            <label htmlFor=""> Product Sub-category:</label> <br/>
            <select
              className="custom-select"
              onChange={(e) => setSubcategory(e.target.value)}
              value={subcategory}>
              <option value="">Choose...</option>
              {categories
                .find((cat) => cat.name === category)
                ?.subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </div>

          {/* Product Category */}
          {/* <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Product Category
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              onChange={(e) => setCategory(e.target.value)}>
              <option selected>Choose...</option>
              <option value="Alphabets">A-Z</option>
              <option value="Numbers">1-9</option>
              <option value="Symbols">!-*</option>
            </select>
          </div> */}
          {/* Sub-category  */}
          {/* <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">
                Product Sub-category
              </label>
            </div>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              onChange={(e) => setSubcategory(e.target.value)}>
              <option selected>Choose...</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </select>
          </div> */}
          {/* Product Brand */}
          <div className="mb-2">
            <label htmlFor=""> Product Brand</label>
            <input
              type="text"
              placeholder="Enter Brand Name"
              className="form-control"
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
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button className="btn btn-success">Submit </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct
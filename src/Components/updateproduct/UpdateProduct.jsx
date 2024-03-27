import React, { useEffect, useState } from 'react'
import "../updateproduct/updateproduct.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const UpdateProduct = () => {
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

  const { id } = useParams();
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getProduct/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setFeatures(result.data.features);
        setDescription(result.data.description);
        setImage(result.data.image);
        setCategory(result.data.category);
        setSubcategory(result.data.subcategory);
        setBrand(result.data.brand);
        setDate(result.data.date);
      })
      .catch((err) => console.log(err));
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

      Update();
  };

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    const strippedContent = content
      .replace(/<p>/g, "") // Remove <p> tags
      .replace(/<\/p>/g, "") // Remove </p> tags
      .replace(/&nbsp;/g, " "); // Replace &nbsp; with space
    setDescription(strippedContent.trim()); // Update the state with stripped content
  };

  //  categories Function

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    const matchingCategory = categories.find(
      (cat) => cat.name === selectedCategory
    );
    if (matchingCategory) {
      setSubcategory(matchingCategory.subcategories[0]); // Set default subcategory from matching category
    }
  };


  // const handleCategoryChange = (e) => {
  //   const selectedCategory = e.target.value;
  //   setCategory(selectedCategory);
  //   console.log("Updated category:", selectedCategory); // Debugging line
  //   const matchingCategory = categories.getData(
  //     (cat) => cat.name === selectedCategory
  //   );
  //   if (matchingCategory) {
  //     setSubcategory(matchingCategory.subcategories[0]); // Set default subcategory from matching category
  //   }
  // };

  useEffect(() => {
    setSubcategory(
      categories.find((cat) => cat.name === category)?.subcategories[0]
    );
  }, [category]);

  
   const handleImage=(e) =>{
    console.log(e.target.files);
        setImage(e.target.files[null])

   }




  return (
    <div className="Update d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white p-3 Update-Box">
        <form onSubmit={Update} className="Update-Form">
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
          </div>

          {/* Product Image */}
          {/* <div className="mb-2">
            <label htmlFor=""> Product Image</label>
            <input
              type="text"
              placeholder="Enter Product Image"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div> */}

          {/* Product Image */}
          <div className="mb-2">
            <label htmlFor=""> Product Image : </label> <br />
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
            <label htmlFor=""> Product Category</label>
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
            <label htmlFor=""> Product Sub-category</label>
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
              value={category}
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
              value={subcategory}
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
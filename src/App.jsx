import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes , Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.css";
import Product from './Components/product/Product';
import CreateProduct from './Components/create/CreateProduct';
import UpdateProduct from './Components/updateproduct/UpdateProduct';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Product/>}>  </Route>
      <Route path="/create" element={<CreateProduct/>}> </Route>
      <Route path="/update" element={<UpdateProduct/>}> </Route>
    </Routes>
    </BrowserRouter>
      
       
    </>
  )
}

export default App

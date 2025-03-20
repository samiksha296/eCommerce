
//AdminDashboard is not conected to backend

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

// call api for fetch the products

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error Fetching Products", error);
    }
  };

// call api for delete the Product...

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } 
    catch(error){
      console.error("Error deleting product",error);
    }
  };
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Link to="/add-product" className="add-btn">Add New Product</Link>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* backend is not connected yet ....... */}
          
          {/* {products.map((product) => (
            <tr key={product._id}>
              <td><img src={product.image} alt={product.name} className="product-img" /></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <Link to={`/edit-product/${product._id}`} className="edit-btn">Edit</Link>
                <button onClick={() => deleteProduct(product._id)} className="delete-btn">Delete</button>
              </td>
            </tr>

          ))} */}

{Array.isArray(products) && products.map((product) => (
  <tr key={product._id}>
    <td><img src={product.image} alt={product.name} className="product-img" /></td>
    <td>{product.name}</td>
    <td>${product.price}</td>
    <td>
      <Link to={`/edit-product/${product._id}`} className="edit-btn">Edit</Link>
      <button onClick={() => deleteProduct(product._id)} className="delete-btn">Delete</button>
    </td>
  </tr>
))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

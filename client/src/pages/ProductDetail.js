//warning: This code is working properly don't disturb it..

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
  
  const ProductDetail = ({ addToCart }) => {
  const { id } = useParams(); // Get product Id from URL..
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
      setLoading(false);
    };
    
    fetchProduct();}, [id]);
  
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product Not Found</p>;
     
  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
       
    <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;

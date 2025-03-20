//after edit button this code woring properly..

import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

 const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>

      {/* View Details Button */}
      <Link to={`/product/${product._id}`} className="details-btn">
        View Details
      </Link>
         
      {/* Edit Button */}
      <Link to={`/edit-product/${product._id}`} className="edit-btn">
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ProductCard;


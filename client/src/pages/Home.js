import React from "react";
import { Link } from "react-router-dom";
import "../Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1>Welcome to our asyncProduct$</h1>
        <p>Your one-stop shop for the latest and greatest products. Discover amazing deals and exclusive collections.</p>
        <Link to="/products" className="shop-now">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Home;

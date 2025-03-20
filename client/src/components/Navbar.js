// //after add with icons code running properly

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaBoxOpen, FaShoppingCart, FaPlusCircle } from "react-icons/fa"; // Import icons

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">asyncProduct$</h2>
//       <div className="nav-links">
//         <Link to="/">
//           <FaHome size={20} /> Home
//         </Link>
//         <Link to="/products">
//           <FaBoxOpen size={20} /> Products
//         </Link>
        
//         <Link to="/add-product">
//           <FaPlusCircle size={20} /> Add Product
//         </Link>
//         <Link to="/cart">
//           <FaShoppingCart size={20} /> 
//         </Link>
// {/* changes after admin */}
//       <Link to="/admin">Admin Dashboard</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



//update count in cart


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaHome, FaBoxOpen, FaShoppingCart, FaPlusCircle } from "react-icons/fa"; // Import icons

// const Navbar = () => {
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartCount(storedCart.length);
//   }, []);

//   return (
//     <nav className="navbar">
//       <h2 className="logo">asyncProduct$</h2>
//       <div className="nav-links">
//         <Link to="/">
//           <FaHome size={20} /> Home
//         </Link>
//         <Link to="/products">
//           <FaBoxOpen size={20} /> Products
//         </Link>
//         <Link to="/add-product">
//           <FaPlusCircle size={20} /> Add Product
//         </Link>
//         <Link to="/cart" style={{ position: "relative" }}>
//           <FaShoppingCart size={20} />
//           {cartCount > 0 && (
//             <span
//               style={{
//                 position: "absolute",
//                 top: "-5px",
//                 right: "-10px",
//                 backgroundColor: "red",
//                 color: "white",
//                 borderRadius: "50%",
//                 padding: "3px 7px",
//                 fontSize: "12px",
//               }}
//             >
//               {cartCount}
//             </span>
//           )}
//         </Link>
//         {/* changes after admin */}
//         <Link to="/admin">Admin Dashboard</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


///add profile using login signup....

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBoxOpen, FaShoppingCart, FaPlusCircle, FaUser } from "react-icons/fa"; // Import icons
import  "./Navbar.css"
const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
    
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
          
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">asyncProduct$</h2>
      <div className="nav-links">
        <Link to="/">
          <FaHome size={20} /> Home
        </Link>
        <Link to="/products">
          <FaBoxOpen size={20} /> Products
        </Link>
        <Link to="/add-product">
          <FaPlusCircle size={20} />Add Product
        </Link>
        
        <Link to="/cart" style={{ position:"relative" }}>
          <FaShoppingCart size={20} />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "3px 7px",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
           </div>

        {/* Profile Icon Dropdown */}
         <div className="profile-dropdown">
          <FaUser size={20} className="profile-icon" />
          <div className="dropdown-content">
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Signup</Link>
              </>
            )}
          </div>
        </div>
    </nav>
  );
};
export default Navbar;

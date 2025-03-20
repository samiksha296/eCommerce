 //This update code is working properly don't touch it glti se b...


//   import React, { useState, useEffect } from "react";  

//   const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(storedCart);
//   }, []);

//   //code for remove the Cart...

//   const removeFromCart = (id) => {
//     const updatedCart = cartItems.filter((item) => item._id !== id);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     alert("Item Removed from Cart..");
//   };
  
//   return (
//     <div>
//       <h2>Shopping Cart</h2>
      
//       {/* in this we have used ternary condition ....*/}
//       {/* // cond ? true: false* */}

//       {cartItems.length === 0 ? (
//         <p>Your Cart is Empty...</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               {/*Display product image */}
//               <img 
//                 src={item.image} 
//                 alt={item.name} 
//                 style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
//               />
//               <div>  
//                 <p><strong>{item.name}</strong></p>
//                 <p>Quantity: {item.quantity}</p>
//                 <button onClick={() => removeFromCart(item._id)}>Remove</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Cart;


//after modify cart to backend

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get user token

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Remove from Cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Item Removed from Cart.");
  };

  // Place Order (Only for Logged-In Users)
  const handleOrder = async () => {
    if (!token) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }
      
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    
    // Transform cartItems to match backend structure
    const orderItems = cartItems.map((item) => ({
      name: item.name,
      image: item.image || "", // Handle missing images
      quantity: item.quantity,
      price: item.price,
      productId: item._id, // Ensure each item has productId
    }));
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/order", // Ensure correct backend route
        { cartItems: orderItems }, // Send correct data
        { headers: { Authorization: `Bearer ${token}` } }
      );
       
      console.log(response.data);
      alert("Order Placed Successfully!");
      localStorage.removeItem("cart"); // Clear Cart After Order
      setCartItems([]);
    } catch (error) {
      console.error("Order Error:", error.response?.data || "Server error");
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your Cart is Empty....</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
              />
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && <button onClick={handleOrder}
      style={{ width:"60px",marginLeft:"100px", backgroundColor:"navy",borderRadius:"10px" }}
    
       >Order</button>}
    </div>
  );
};

export default Cart;



// not worked..

// import React, { useState, useEffect } from "react";

// const userId = "65a1b2c3d4e5f6g7h8i9j0k1"; //  Replace with actual user ID

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Fetch cart items
//   const fetchCartItems = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
//       const data = await response.json();
//       console.log("Fetched Cart Data:", data); // ✅ Debugging
//       if (response.ok) {
//         setCartItems(data.items || []);
//       } else {
//         console.error("Error fetching cart:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetch("http://localhost:5000/api/cart")
//       .then((res) => res.json())
//       .then((data) => console.log("Cart Data:", data)) // ✅ Debugging
//       .catch((err) => console.error("Error fetching cart:", err));
//   }, []);
  

//   // useEffect(() => {
//   //   fetchCartItems();
//   // }, []);

//   // ✅ Add product to cart
//   const addToCart = async (product) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/cart/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           productId: product._id,
//           name: product.name,
//           image: product.image,
//           price: product.price,
//           quantity: 1,
//         }),
//       });

//       const data = await response.json();
//       console.log("Add to Cart Response:", data); //  Debugging

//       if (response.ok) {
//         fetchCartItems(); // Refresh cart after adding item
//       } else {
//         alert(data.message || "Failed to add item");
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   // ✅ Remove product from cart
//   const removeFromCart = async (productId) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/cart/remove", {
//         method: "POST", // ✅ Changed DELETE to POST
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId }),
//       });

//       const data = await response.json();
//       console.log("Remove from Cart Response:", data); // Debugging

//       if (response.ok) {
//         fetchCartItems(); //  Refresh cart after removal
//       } else {
//         alert(data.message || "Failed to remove item");
//       }
//     } catch (error) {
//       console.error("Error removing from cart:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your Cart is Empty...</p>
//       ) : (
//         <ul>
//           {cartItems.map((item) => (
//             <li key={item.productId} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />
//               <div>
//                 <p><strong>{item.name}</strong></p>
//                 <p>Quantity: {item.quantity}</p>
//                 <button onClick={() => removeFromCart(item.productId)}>Remove</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Cart;

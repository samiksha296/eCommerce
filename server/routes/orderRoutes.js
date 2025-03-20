// const express = require("express");
// const protect = require("../middlewares/authMiddleware");
// const Order = require("../models/Order");

// const router = express.Router();

// // Place Order (Only for Logged-In Users)
// router.post("/", protect, async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     const newOrder = new Order({
//       user: req.user.id, // Logged-in user ID from middleware
//       items: cartItems,
//     });

//     await newOrder.save();
//     res.json({ message: "Order placed successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error, try again." });
//   }
// });

// module.exports = router;


//updated code ..

// const express = require("express");
// const protect = require("../middlewares/authMiddleware");
// const Order = require("../models/Order");

// const router = express.Router();

// // Place Order (Only for Logged-In Users)
// router.post("/", protect, async (req, res) => {
//   try {
//     const { cartItems } = req.body;

//     if (!cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: "Cart is empty!" });
//     }

//     const newOrder = new Order({
//       user: req.user.id, // User ID from middleware
//       items: cartItems,
//     });

//     await newOrder.save();
//     res.json({ message: "Order placed successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error, try again." });
//   }
// });

// module.exports = router;



//modify cart.js

const express = require("express");
const protect = require("../middlewares/authMiddleware");
const Order = require("../models/Order");

const router = express.Router();

// Place Order (Only for Logged-In users)
router.post("/", protect, async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty!" });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const newOrder = new Order({
      user: req.user.id, // User ID from middleware
      items: cartItems,
      totalAmount, // Required field
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Server error, try again." });
  }
});

module.exports = router;

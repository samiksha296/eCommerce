
//updated

const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController")


// Add item to cart
router.post("/add", addToCart);

// Get user's cart
router.get("/:userId", getCart);

// Remove item from cart
router.post("/remove", removeFromCart);

module.exports = router;

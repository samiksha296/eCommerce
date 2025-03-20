
 const Cart = require("../models/cart");

// // Add item to cart
// const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, name, image, price, quantity } = req.body;

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     // Check if product already exists in cart
//     const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity; // Update quantity
//     } else {
//       cart.items.push({ productId, name, image, price, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item added to cart", cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // get user carts..

// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// //remove items

// const removeFromCart = async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
//     const cart = await Cart.findOne({ userId });

//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

//     await cart.save();
//     res.status(200).json({ message: "Item removed from cart", cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports={addToCart,getCart,removeFromCart}


//updated

//const Cart = require("../models/cart");

//  Add to Cart - Fixes applied
//  const addToCart = async (req, res) => {
//   try {
//     const { userId, productId, name, image, price, quantity } = req.body;

//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//     }

//     // Find existing product in cart
//     const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity; // ✅ Increment quantity
//     } else {
//       cart.items.push({ productId, name, image, price, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ message: "Item added to cart", cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const addToCart = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); //show request in conole 

    const { userId, productId, name, image, price, quantity } = req.body;
    if (!userId || !productId) {
      console.log("Missing Data:", req.body);
      return res.status(400).json({ message: "Missing UserId or ProductId" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, name, image, price, quantity });
    }

    await cart.save();
    console.log("Updated Cart:", cart); //Log updated cart
    res.status(200).json({ message: "Item added to cart", cart });

  } catch (error) {
    console.error("Error in addToCart:", error); // Log errors
    res.status(500).json({ error: error.message });
  }
};


// Get Cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: "Item Removed from Cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };

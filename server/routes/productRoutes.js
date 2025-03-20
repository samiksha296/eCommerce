
// //updated working properly don't touch...

const express = require("express");
const router = express.Router();
const { getProducts, getProductById, addProduct ,updateProduct} = require("../controllers/productController");

// Route to get all products
router.get("/", getProducts);

// Route to get a single product by ID
router.get("/:id", getProductById);

// Route to add a new product
router.post("/", addProduct);


// route to update new product
// router.put("/products/:id", updateProduct);
router.put("/:id", updateProduct);



module.exports = router;


//after changes in product controller add in backend


// const express = require("express");
// const {
//   getProducts,
//   getProductById,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");

// const verifyAdmin = require("../middlewares/authMiddleware");

// const router = express.Router();

// // ✅ Public Routes (Anyone can access)
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// // ✅ Admin Routes (Require Admin Token)
// router.post("/", verifyAdmin, addProduct);
// router.put("/:id", verifyAdmin, updateProduct);
// router.delete("/:id", verifyAdmin, deleteProduct);

// module.exports = router;

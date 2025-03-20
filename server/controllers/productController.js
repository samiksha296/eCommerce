
//This code is working properly don't disturb it..

// const Product = require("../models/productModel");

// //add smooth pagination and reset page....

//   const getProducts = async (req, res) => {
//       try {
//     let page = parseInt(req.query.page) || 1; // Default page is 1
//     let limit = 28;
//     let skip = (page - 1) * limit; // products skip...
    
//     // Sorting logic: Sort price in ascending (low to high) or descending (high to low)
//     let sortOrder = req.query.sort === "lowToHigh" ? { price: 1 } : req.query.sort === "highToLow" ? { price: -1 } : {};
    
//     //fetch the filtered products from sorting and pagination
//     const products = await Product.find().sort(sortOrder).skip(skip).limit(limit);

//     // Count total number of products (for pagination)
//     const totalProducts = await Product.countDocuments();

//     const totalPages = Math.ceil(totalProducts / limit);

//     // Ensure the page does not to go beyond pages
//      if (page > totalPages) {
//       return res.status(400).json({ message: "Page number exceeds total pages." });
//     }
     
//     res.json({
//       products,
//       totalPages,
//       currentPage: page,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


//update paging
const Product = require("../models/productModel");

const getProducts = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1; // Default to page 1
    let limit = 28; // Products per page

    // Ensure page is at least 1
    if (page < 1) page = 1;

    // Sorting logic (low-to-high or high-to-low)
    let sortOrder = {};
    if (req.query.sort === "lowToHigh") sortOrder.price = 1;
    if (req.query.sort === "highToLow") sortOrder.price = -1;

    // Count total products
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Ensure valid page range
    if (page > totalPages) page = totalPages || 1; // Reset to last valid page or first page if no data

    // Fetch paginated & sorted products
    const products = await Product.find()
      .sort(sortOrder)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      products,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get Single Product by ID..

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//add a product..

const addProduct = async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    if (!name || !price || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, image, description });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update product details
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

module.exports = { getProducts, getProductById, addProduct ,updateProduct};


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");


const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes"); // Add cart routes
const authRoutes = require("./routes/authRoutes")
const orderRoutes = require("./routes/orderRoutes")

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  credentials: true, // Allow cookies
}));

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);  // Use cart routes
app.use("/api/auth", authRoutes); //  Use admin authentication routes
app.use("/api/order",orderRoutes)

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const productRoutes = require("./routes/productRoutes");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// //Routes

// app.use("/api/products", productRoutes);

// //pagnation for product routes


// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });



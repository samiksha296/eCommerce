//login Register

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
  router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

























// const express = require("express");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// // Hardcoded Admin Credentials
// const ADMIN_CREDENTIALS = {
//   username: "admin",
//   password: "admin123",
// };

// // Admin Login Route
// router.post("/admin/login", (req, res) => {
//   const { username, password } = req.body;

//   if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
//     const token = jwt.sign({ username, isAdmin: true }, "secret", { expiresIn: "1h" });
//     return res.json({ token });
//   }

//   res.status(401).json({ message: "Invalid credentials" });
// });

// module.exports = router;

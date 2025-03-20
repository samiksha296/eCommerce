 //const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };

// module.exports = protect;



// //order


// // const jwt = require("jsonwebtoken");

// // const authMiddleware = (req, res, next) => {
// //   const token = req.header("Authorization");

// //   if (!token) return res.status(401).json({ message: "Access Denied!" });

// //   try {
// //     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(400).json({ message: "Invalid Token" });
// //   }
// // };

// // module.exports = authMiddleware;



//updated

// const protect = (req, res, next) => {
//   let token = req.header("Authorization");

//   console.log("Received Token:", token);  // Debugging

//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     if (token.startsWith("Bearer ")) {  
//       token = token.split(" ")[1];  // Extract actual token
//     }

//     console.log("Extracted Token:", token); // Debugging
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("JWT Error:", error.message);
//     res.status(401).json({ message: "Invalid Token" });
//   }
// };
// module.exports=protect;



//after modify cart to backend..

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }
  
  try {
    token = token.split(" ")[1]; // Extract actual token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Error:", error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = protect;

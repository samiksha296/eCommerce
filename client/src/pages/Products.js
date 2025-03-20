//     //after check all frontend code

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);


//   useEffect(() => {
//     fetch("http://localhost:5000/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.log("Error fetching products:", err));
//   }, []);
  
//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 10) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="products-container">
//       <h2>Products</h2>
//       <div className="product-grid">
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// };

// export default Products;


//updated code forfix problem in pagination

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState(""); // Sorting state

  const loaderRef = useRef(null); // Bottom observer
  const topRef = useRef(null); // Top observer
  const prevPage = useRef(page); // Track previous page

  // Fetch products with pagination and sorting
  const fetchProducts = async (newPage, sortOption, reset = false) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products?page=${newPage}&limit=28&sort=${sortOption}`
      );

      if (res.data.products.length > 0) {
        if (reset) {
          setProducts(res.data.products); // Reset products on sorting change
        } else {
          setProducts((prev) =>
            newPage === 1 ? res.data.products : [...prev, ...res.data.products]
          );
        }
        setTotalPages(res.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching Products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page, sort, page === 1);
  }, [page, sort]);

  // Intersection observer for infinite scroll and reset
  useEffect(() => {
    const options = { threshold: 1.0 };

    // Observer for Bottom (Load Next Page)
    const observerBottom = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages && prevPage.current === page) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    // Observer for Top (Reset to Page 1)
    const observerTop = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page !== 1) {
        setPage(1);
      }
    }, options);
    
    if (loaderRef.current) observerBottom.observe(loaderRef.current);
    if (topRef.current) observerTop.observe(topRef.current);

    return () => {
      if (loaderRef.current) observerBottom.unobserve(loaderRef.current);
      if (topRef.current) observerTop.unobserve(topRef.current);
    };
  }, [page, totalPages]);

  useEffect(() => {
    prevPage.current = page; // Track previous page to prevent unwanted jumps
  }, [page]);

  return (
    <div className="products-container">

      {/* Sorting dropdown */}
      <div className="sorting-container">
        <label>Sort by Price:</label>
        <select onChange={(e) => { setSort(e.target.value); setPage(1); }} value={sort}>
          <option value="">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Page Reset Observer */}
      <div ref={topRef}></div>

      {/* Pagination Info (Fixed at the bottom) */}
      <div className="pagination-info">
        <p>{page} / {totalPages}</p>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {/* Bottom Loader for Infinite Scroll */}
      <div ref={loaderRef} style={{ height: "10px", marginBottom: "20px" }}></div>
    </div>
  );
};

export default Products;

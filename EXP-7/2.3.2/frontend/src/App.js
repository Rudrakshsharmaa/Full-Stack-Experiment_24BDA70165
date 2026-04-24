import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e3f2fd, #ffffff)",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#1976d2",
          padding: "15px",
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        🛍️ My Shopping App
      </div>

      {/* PRODUCT SECTION */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#1976d2" }}>Products</h2>
        <ProductList />
      </div>

      {/* CART SECTION */}
      <div style={{ padding: "20px" }}>
        <Cart />
      </div>
    </div>
  );
}

export default App;
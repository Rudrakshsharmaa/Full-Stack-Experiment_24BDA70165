import React from "react";
import ProductList from "./components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container mt-4">
      <h2>Product List</h2>
      <ProductList />
    </div>
  );
}

export default App;
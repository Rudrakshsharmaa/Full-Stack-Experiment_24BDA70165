import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="spinner-border"></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="row">
      {products.map(p => (
        <div className="col-md-4" key={p._id}>
          <div className="card">
            <img src={p.image} className="card-img-top" alt="" />
            <div className="card-body">
              <h5>{p.name}</h5>
              <p>₹{p.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid
} from "@mui/material";

const products = [
  {
    _id: "1",
    name: "Smartphone",
    price: 29999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
  },
  {
    _id: "2",
    name: "Laptop",
    price: 59999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    _id: "3",
    name: "Headphones",
    price: 2999,
    image: "https://images.unsplash.com/photo-1518441902113-cb80ab4a7b07"
  },
  {
    _id: "4",
    name: "Smart Watch",
    price: 6999,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b"
  },
  {
    _id: "5",
    name: "Camera",
    price: 44999,
    image: "https://images.unsplash.com/photo-1519183071298-a2962eadc9f2"
  },
  {
    _id: "6",
    name: "Bluetooth Speaker",
    price: 3499,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1f6"
  }
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <Grid container spacing={3}>
      {products.map((p) => (
        <Grid item xs={12} sm={6} md={4} key={p._id}>
          <Card
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "0.3s"
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={p.image}
              alt={p.name}
            />

            <CardContent>
              <Typography variant="h6">{p.name}</Typography>

              <Typography
                variant="body1"
                style={{ color: "#2e7d32", fontWeight: "bold" }}
              >
                ₹{p.price}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: "10px",
                  backgroundColor: "#1976d2"
                }}
                onClick={() => dispatch(addToCart(p))}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
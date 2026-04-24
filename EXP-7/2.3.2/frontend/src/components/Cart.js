import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";

import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography,
  Button, TextField
} from "@mui/material";

const Cart = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "20px" }}>
      
      <Typography variant="h3" align="center" gutterBottom style={{ color: "#1976d2" }}>
        🛒 Shopping Cart
      </Typography>

      <TableContainer component={Paper} style={{ borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Product</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cart.map(item => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({
                        id: item._id,
                        quantity: Number(e.target.value)
                      }))
                    }
                    style={{ width: "80px" }}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(removeFromCart(item._id))}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h5"
        align="right"
        style={{ marginTop: "20px", fontWeight: "bold", color: "#2e7d32" }}
      >
        Total: ₹{total.toFixed(2)}
      </Typography>
    </div>
  );
};

export default Cart;
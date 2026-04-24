import React, { useState } from "react";

import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = (data) => {
    setLoading(true);
    setMessage(null);

    // Simulated authentication
    setTimeout(() => {
      setLoading(false);

      if (data.email === "admin@example.com" && data.password === "123456") {
        setMessage({ type: "success", text: "Login successful!" });
      } else {
        setMessage({ type: "error", text: "Invalid credentials" });
      }
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Typography variant="h5" className="login-title">
          Welcome Back 👋
        </Typography>

        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="login-btn"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
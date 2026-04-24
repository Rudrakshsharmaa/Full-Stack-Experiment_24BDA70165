import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper
} from "@mui/material";

const socket = io("http://localhost:5000");

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [users, setUsers] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit("join", user);

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("system", (msg) => {
      setMessages((prev) => [...prev, { system: true, text: msg }]);
    });

    socket.on("typing", (name) => {
      setTyping(name + " is typing...");
      setTimeout(() => setTyping(""), 1500);
    });

    socket.on("users", (list) => {
      setUsers(list);
    });

  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", {
        user,
        text: message,
        time: new Date().toLocaleTimeString(),
      });
      setMessage("");
    }
  };

  return (
    <Box sx={{ maxWidth: "700px", margin: "auto", mt: 4 }}>

      {/* HEADER */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          background: "linear-gradient(45deg, #2196f3, #21cbf3)",
          color: "white",
          mb: 2
        }}
      >
        <Typography variant="h5">💬 Chat Room</Typography>
        <Typography variant="body2">
          Online: {users.join(", ")}
        </Typography>
      </Paper>

      {/* CHAT AREA */}
      <Paper
        sx={{
          height: 400,
          overflowY: "auto",
          p: 2,
          borderRadius: 3,
          background: "#f5f5f5"
        }}
      >
        {messages.map((msg, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            {msg.system ? (
              <Typography
                align="center"
                sx={{ color: "gray", fontStyle: "italic" }}
              >
                {msg.text}
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    msg.user === user ? "flex-end" : "flex-start",
                  alignItems: "center"
                }}
              >
                {msg.user !== user && (
                  <Avatar sx={{ mr: 1 }}>
                    {msg.user[0].toUpperCase()}
                  </Avatar>
                )}

                <Box
                  sx={{
                    bgcolor:
                      msg.user === user ? "#1976d2" : "#e0e0e0",
                    color: msg.user === user ? "white" : "black",
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    maxWidth: "60%"
                  }}
                >
                  <Typography variant="body2">
                    {msg.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ float: "right", opacity: 0.7 }}
                  >
                    {msg.time}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ))}

        {/* Typing indicator */}
        <Typography sx={{ color: "gray", fontStyle: "italic" }}>
          {typing}
        </Typography>

        <div ref={bottomRef}></div>
      </Paper>

      {/* INPUT AREA */}
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField
          fullWidth
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            socket.emit("typing", user);
          }}
        />

        <Button
          variant="contained"
          sx={{
            ml: 2,
            background: "linear-gradient(45deg, #2196f3, #21cbf3)"
          }}
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
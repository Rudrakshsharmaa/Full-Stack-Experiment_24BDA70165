require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// Routes
// ======================
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/transactionRoutes'));

// ======================
// MongoDB Connection
// ======================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// ======================
// Error Handler
// ======================
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
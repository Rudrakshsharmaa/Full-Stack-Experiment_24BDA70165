const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const auth = require('../middleware/auth');

// ======================
// REGISTER
// ======================
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            name,
            email,
            password: hashed
        });

        await user.save();

        console.log("🔥 NEW USER SAVED:", user);

        // 🔥 Get updated users list
        const allUsers = await User.find().select('-password');

        res.json({
            message: "Registered Successfully",
            newUser: {
                id: user._id,
                email: user.email
            },
            allUsers   // 🔥 THIS SHOWS UPDATED USERS
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ======================
// LOGIN
// ======================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 🔥 Get updated users list
        const allUsers = await User.find().select('-password');

        res.json({
            accessToken: token,
            loggedInUser: {
                id: user._id,
                email: user.email
            },
            allUsers   // 🔥 UPDATED USERS HERE
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ======================
// ACCOUNT (Protected)
// ======================
router.get('/account', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ======================
// ALL USERS (For Testing)
// ======================
router.get('/all-users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
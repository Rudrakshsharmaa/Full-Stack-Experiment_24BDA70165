const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// ======================
// TRANSFER (WITH FALLBACK)
// ======================
router.post('/transfer', auth, async (req, res) => {
    try {
        const { toUserId, amount } = req.body;

        const from = await User.findById(req.user.id);
        const to = await User.findById(toUserId);

        if (!to) return res.status(404).json({ message: "Receiver not found" });

        if (from.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Update balances
        from.balance -= amount;
        to.balance += amount;

        await from.save();
        await to.save();

        // Log transaction
        await Transaction.create({
            from: from._id,
            to: to._id,
            amount,
            status: "SUCCESS"
        });

        res.json({ message: "Transfer Successful" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ======================
// GET TRANSACTIONS
// ======================
router.get('/transactions', auth, async (req, res) => {
    try {
        const logs = await Transaction.find({
            $or: [{ from: req.user.id }, { to: req.user.id }]
        });

        res.json(logs);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
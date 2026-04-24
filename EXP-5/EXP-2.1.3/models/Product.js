const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    sku: String,
    color: String,
    price: Number,
    stock: Number
});

const reviewSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String
});

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    variants: [variantSchema],
    reviews: [reviewSchema],
    avgRating: Number
});

productSchema.index({ category: 1 });

module.exports = mongoose.model("Product", productSchema);
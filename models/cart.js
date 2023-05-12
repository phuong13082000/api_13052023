const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    img1: String,
    title: String,
    price: Number,
    strike: String,
    category: String,
    maincategory: String,
    stock: Number,
    img2: String,
    quantity: {type : Number , default : 1},
    userID:String,
});

const Cart = mongoose.model("cartItem", cartSchema);

module.exports = Cart;

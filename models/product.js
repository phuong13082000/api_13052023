const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    detail: {type: String, require: true},
    number: {type: Number, require: true},
    category: String,
    images: [{
        public_id: {type: String, required: true},
        url: {type: String, required: true}
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;

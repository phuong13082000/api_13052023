const express = require("express");
const {createProduct, deleteProduct} = require("../controllers/wishlist");
const wishlistRouter = express.Router();

wishlistRouter.route('/add/:userId').post(createProduct);
wishlistRouter.route('/delete/:userId').post(deleteProduct);

module.exports = wishlistRouter;

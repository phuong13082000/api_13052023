const express = require("express");
const {createProduct, deleteProduct} = require("../controllers/wishlist");
const WishlistRouter = express.Router();

WishlistRouter.route('/add/:userId').post(createProduct);
WishlistRouter.route('/delete/:userId').post(deleteProduct);

module.exports = WishlistRouter;

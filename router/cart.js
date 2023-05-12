const express = require("express");
const CartRouter = express.Router();
const {createProduct, deleteProduct} = require("../controllers/product");

CartRouter.route('/add/:userId').post(createProduct);
CartRouter.route('/delete/:userId').post(deleteProduct);

module.exports = CartRouter;

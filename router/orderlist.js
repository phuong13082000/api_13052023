const express = require("express");
const {createProduct} = require("../controllers/orderlist");
const OrderListRouter = express.Router();

OrderListRouter.route('/add/:userId').post(createProduct);

module.exports = OrderListRouter;

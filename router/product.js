const express = require("express");
const ProductRouter = express.Router();
const {
    getAllProduct,
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

ProductRouter.route('/').get(getProducts);
ProductRouter.route('/:id').get(getProduct);
ProductRouter.route('/add').post(createProduct);
ProductRouter.route('/update/:id').patch(updateProduct);
ProductRouter.route('/delete/:id').delete(deleteProduct);

module.exports = ProductRouter;

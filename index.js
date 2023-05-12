require("dotenv").config();
const express = require("express");
const app = express();
const {connect} = require("./config/database");
const cors = require("cors");
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ProductRouter = require("./router/product");
const AdminRouter = require("./router/admin");
const CartRouter = require("./router/cart");
const wishlistRouter = require("./router/wishlist");
const OrderListRouter = require("./router/orderlist");

app.use("/api/products", ProductRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/cart", CartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orderlist", OrderListRouter);

app.listen(PORT, async () => {
    try {
        await connect;
        console.log(`http://localhost:${PORT}`);
    } catch (error) {
        console.log("connection failed");
    }
    console.log(`The Port is Running on ${PORT}`);
});

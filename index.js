require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connect = require("./config/database");
const PORT = process.env.PORT || 4000;

const ProductRouter = require("./router/product");
const AdminRouter = require("./router/admin");
const UserRouter = require("./router/user");
const CartRouter = require("./router/cart");
const WishlistRouter = require("./router/wishlist");
const OrderListRouter = require("./router/orderlist");

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

app.get('/', (req, res) => {res.send('Server is Running! 🚀')});
app.use("/api/products", ProductRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/wishlist", WishlistRouter);
app.use("/api/orderlist", OrderListRouter);

connect();

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

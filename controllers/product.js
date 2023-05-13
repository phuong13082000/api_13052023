const Product = require("../models/product");
const cloudinary = require('cloudinary');
const queryFinder = require("../utils/queryFinder");

//get all product client
exports.getAllProduct = (async (req, res) => {
    try {
        const resPerPage = 10;
        const totalProduct = await Product.countDocuments();
        const apiFeature = new queryFinder(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resPerPage)
            .sort();
        const products = await apiFeature.query;
        res.status(200).send({success: true, products, totalProduct});
    } catch (error) {
        res.send({error: error.message});
    }
});

//get all product admin
exports.getProducts = (async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({products: products});
    } catch (error) {
        res.status(500).send({msg: "Something Went Wrong!"});
    }
});

//get one
exports.getProduct = (async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        res.status(200).json({success: true, product: product});
    } catch (error) {
        res.status(500).send({msg: "Something Went Wrong!"});
    }
});

//create product
exports.createProduct = (async (req, res) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLink;

    try {
        await Product.create(req.body);
        res.status(200).send({msg: "Add product successfully"});
    } catch (error) {
        res.status(500).send({msg: "Something Went Wrong!"});
    }
});

//update product
exports.updateProduct = (async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    let product = await Product.findById(id);

    let images = [];
    if (payload.images !== undefined) {
        if (typeof req.body.images === "string") {
            images.push(payload.images);
        } else {
            images = payload.images;
        }

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        payload.images = imagesLink;
    }

    await Product.findByIdAndUpdate({_id: id}, payload);
    res.status(200).send({msg: "update product successfully"});
});

//delete product
exports.deleteProduct = (async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await Product.findByIdAndDelete({_id: id});
        res.status(200).send({msg: "delete product successfully"});
    } catch (error) {
        res.status(500).send({msg: "Something Went Wrong!"});
    }
});
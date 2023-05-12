const {userModel} = require("../models/user");

exports.createProduct = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        let user = await userModel.findById({_id: userId});
        let cart = user.cartitem;
        console.log("this is from cart and this is old user:- ", user, cart);
        cart = [...cart, req.body];
        await userModel.findByIdAndUpdate({_id: userId}, {cartitem: cart});
        let sameuser = await userModel.findById({_id: userId});
        console.log("this is from cart and this is new user:- ", sameuser);
    } catch (error) {
        next(error);
    }
    res.status(200).json(req.body);
}

exports.deleteProduct = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        let user = await userModel.findById({_id: userId});
        let cart = user.cartitem;
        console.log("this is from cart and this is old user:- ", user, cart);
        newcart = cart.filter((elem) => {
            return elem._id !== req.body._id;
        });
        await userModel.findByIdAndUpdate({_id: userId}, {cartitem: newcart});
        let sameuser = await userModel.findById({_id: userId});
        console.log("this is from cart and this is new user:- ", sameuser);
    } catch (error) {
        next(error);
    }
    res.status(200).json(req.body);
}

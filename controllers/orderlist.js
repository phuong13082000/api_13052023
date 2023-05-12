const {userModel} = require("../models/user");

exports.createProduct = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        let user = await userModel.findById({_id: userId});
        let orderlist = user.orderlist;
        console.log("this is from cart and this is old user:- ", user, cart);
        orderlist = [...orderlist, req.body];
        await userModel.findByIdAndUpdate({_id: userId}, {orderlist: orderlist});
        let sameuser = await userModel.findById({_id: userId});
        console.log("this is from cart and this is new user:- ", sameuser);
    } catch (error) {
        next(error);
    }
    res.status(200).json(req.body);
}

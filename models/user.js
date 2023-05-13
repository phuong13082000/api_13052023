const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userschema = mongoose.Schema({
        first_name: {type: String, require: true},
        last_name: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        mobile: {type: Number, require: true},
        wishlist: {type: Array},
        cartitem: {type: Array},
        role: {type: String, default: "user"},
        orderlist: {type: Array}
    }, {
        versionKey: false,
        timestamps: true
    }
);

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
});

userschema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("user", userschema)

module.exports = {userModel}
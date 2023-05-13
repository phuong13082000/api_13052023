require("dotenv").config();
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user")

exports.listUser = (async (req, res) => {
    try {
        const user = await userModel.find()
        res.send({ user: user })
    }
    catch (err) {
        res.send("Error")
    }
})

exports.deleteUser = (async (req, res) => {
    const id = req.params.id
    try {
        await userModel.findByIdAndDelete({ _id: id })
        res.send({ user: "success" })
    }
    catch (err) {
        res.send({ user: "error" })
    }
})

exports.loginUser = (async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.send({ msg: "User already exists" });

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) return res.send({ msg: "Invalid Email or Password" });

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) res.send({ msg: "Invalid Email or Password" });
    } catch (err) {
        res.send("Login Error")
    }
})

exports.registerUser = (async (req, res) => {
    let { email, password, first_name, last_name, mobile } = req.body;
    const registerUser = await userModel.findOne({ email })
    if (registerUser?.email) {
        res.send({ msg: "User already exists" })
    } else {
        try {
            await userModel.create({ email, password, first_name, last_name, mobile });
            res.send({ msg: "User Register Successfully" })
        } catch (err) {
            res.send({ msg: "Register Again" })
        }
    }
})

exports.getUser = (async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.find({ _id: id })
        res.send({ user: user })
    } catch (err) {
        res.send("Error")
    }
})

exports.editUser = (async (req, res) => {
    const Id = req.params.id
    const payload = req.body
    const user = await userModel.find({ _id: Id })
    let password = payload.password
    try {
        if (user.length > 0) {
            bcrypt.hash(password, 10, async (err, secure_pwd) => {
                if (err) {
                    res.send("Wrong Credentials 2")
                } else {
                    await userModel.findByIdAndUpdate({ _id: Id }, payload)
                    await userModel.findByIdAndUpdate({ _id: Id }, { password: secure_pwd })
                    res.send("update the User Profile")
                }
            })
        } else {
            res.send("Wrong Credentials 1")
        }
    } catch (err) {
        res.send("Error 1")
    }
})

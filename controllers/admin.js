require("dotenv").config();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

exports.signupAdmin = (async (req, res) => {
    const {email, password, first_name, last_name, avtar} = req.body;
    try {
        bcrypt.hash(password, 4, async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const admin = new Admin({
                    email,
                    password: secure_password,
                    first_name,
                    last_name,
                    avtar,
                });
                await admin.save();
                res.status(200).send({mag: "signup successfully"});
            }
        });
    } catch (error) {
        res.status(500).send({msg: "Wrong credentials"});
    }
});

exports.loginAdmin = (async (req, res) => {
    const {email, password} = req.body;
    try {
        const admin = await Admin.find({email});
        const hase_pass = admin[0].password;

        if (admin.length > 0) {
            bcrypt.compare(password, hase_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({adminID: admin[0]._id}, key);
                    res.send({msg: "login successfully", token: token, admin: admin});
                } else {
                    res.status(400).send({msg: "wrong credentials"});
                }
            });
        }
    } catch (error) {
        res.status(500).send({msg: "wrong credentials"});
    }
});


require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGOURL;

const connect = () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connect;

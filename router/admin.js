const express = require("express");
const AdminRouter = express.Router();
const {signupAdmin, loginAdmin} = require("../controllers/admin");

AdminRouter.route('/admin-signup').post(signupAdmin);
AdminRouter.route('/login').post(loginAdmin);

module.exports = AdminRouter;

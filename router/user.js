const express = require("express");
const UserRouter = express.Router();
const {
    loginUser,
    registerUser,
    getUser,
    editUser
} = require("../controllers/user");

UserRouter.route('/login').post(loginUser);
UserRouter.route('/register').post(registerUser);
UserRouter.route('/:id').get(getUser);
UserRouter.route('/edit/:id').patch(editUser);

module.exports = UserRouter;

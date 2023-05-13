const express = require("express");
const UserRouter = express.Router();
const {
    loginUser,
    registerUser,
    listUser,
    getUser,
    editUser,
    deleteUser
} = require("../controllers/user");

UserRouter.route('/login').post(loginUser);
UserRouter.route('/register').post(registerUser);
UserRouter.route('/').get(listUser);
UserRouter.route('/:id').get(getUser);
UserRouter.route('/edit/:id').patch(editUser);
UserRouter.route('/delete/:id').delete(deleteUser);

module.exports = UserRouter;

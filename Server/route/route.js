const express = require("express");
const authController = require("../controller/authorization");
const homeRouter = express.Router();

homeRouter.use("/login", authController.login);
homeRouter.use("/register", authController.register);
homeRouter.use("/logout", authController.logout);

module.exports = homeRouter;
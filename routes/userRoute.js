const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.put("/reset", forgetPassword);

module.exports = userRoute;

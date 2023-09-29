const express = require("express");

const userRoute = express.Router();

userRoute.post("/register");

module.exports = userRoute;

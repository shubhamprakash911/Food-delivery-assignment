const express = require("express");
const {
  addOrder,
  getOrderById,
  updateOrderStatusById,
} = require("../controllers/orderController");

const orderRoute = express.Router();

orderRoute.post("/", addOrder);
orderRoute.route("/:id").get(getOrderById).put(updateOrderStatusById);

module.exports = orderRoute;

const asyncHandler = require("../middleware/asyncHandler");
const Order = require("../models/orderModel");

const addOrder = asyncHandler(async (req, res) => {
  const order = await Order.create(req.body);
  res.send({ success: true, data: order });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.send({ success: true, data: order });
});

const updateOrderStatusById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status;
  await order.save();
  res.send({ success: true, data: order });
});

module.exports = { addOrder, getOrderById, updateOrderStatusById };

const asyncHandler = require("../middleware/asyncHandler");
const Restaurant = require("../models/restaurantModel");

const addRestaurant = asyncHandler(async (req, res) => {
  await Restaurant.create(req.body);
  res.send({ message: "Restaurant added successfully", success: true });
});

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.send({ success: true, data: restaurants });
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ _id: req.params.id });
  res.send({ success: true, data: restaurants });
});

const getRestaurantMenu = asyncHandler(async (req, res) => {
  const menu = await Restaurant.find({ _id: req.params.id, menu: 1 });
  res.send({ success: true, data: menu });
});

const addRestaurantMenu = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.find({ _id: req.params.id });
  restaurant.menu.push(req.body.menu);
  await restaurant.save();
  res.send({ success: true, data: restaurant });
});

const deleteRestaurantMenuById = asyncHandler(async (req, res) => {
  const result = await Restaurant.updateOne(
    { _id: req.params.id },
    { $pull: { menu: { _id: req.params.menuId } } }
  );

  if (result.nModifiend === 1) {
    res.send({ success: true, data: result });
  } else {
    res.status(400);
    throw new Error("something went wrong, could not delete menu");
  }
});

module.exports = {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  addRestaurantMenu,
  deleteRestaurantMenuById,
};

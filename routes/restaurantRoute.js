const express = require("express");
const {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  addRestaurantMenu,
  deleteRestaurantMenuById,
} = require("../controllers/restaurantController");

const restaurantRoute = express.Router();

restaurantRoute.route("/").post(addRestaurant).get(getRestaurants);
restaurantRoute.get("/:id", getRestaurantById);
restaurantRoute
  .route("/:id/menu")
  .get(getRestaurantById)
  .put(addRestaurantMenu);

restaurantRoute.route("/:id/menu/:menuId").delete(deleteRestaurantMenuById);

module.exports = restaurantRoute;

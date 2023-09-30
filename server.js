require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const restaurantRoute = require("./routes/restaurantRoute");

const app = express();
connectDB(); //db connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/restaurants", restaurantRoute);

app.get("/", (req, res) => {
  res.send("food delevery backend");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port `, PORT));

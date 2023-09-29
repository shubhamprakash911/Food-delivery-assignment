const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const isConnect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log(error.message);
  }
};

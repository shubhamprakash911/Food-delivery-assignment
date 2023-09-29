const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified(password)) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 5);
});

UserSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("user", UserSchema);

module.exports = User;

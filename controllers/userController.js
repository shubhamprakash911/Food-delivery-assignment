const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/userModel");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, address });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Email not found, Please register first");
  }

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    forget password
// @route   PUT /api/users/forgetPassword
// @access  Public
const forgetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    try {
      user.password = password;
      await user.save();
      res
        .status(200)
        .json({ message: "Password updated successfully", success: true });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong, Please try again");
    }
  } else {
    res.status(400);
    throw new Error("Please provide register email address");
  }
});

module.exports = { registerUser, loginUser, forgetPassword };

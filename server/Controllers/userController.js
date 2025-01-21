const User = require("../Models/userModel");
const displayError = require("../Middlewares/displayError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(displayError(409, "Email is already in use"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
    });
    const createdUser = await user.save();

    const token = jwt.sign(
      { id: createdUser._id, role: createdUser.role },
      process.env.JWT,
      { expiresIn: "10h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(displayError(409, "User not found"));
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(displayError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, {
      expiresIn: "5h",
    });
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { userRegister, userLogin };

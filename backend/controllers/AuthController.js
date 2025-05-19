const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({ message: "User Created Successfully", user });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists)
    return res.status(400).json({ message: "Email is not exists" });

  const isPasswordMatch = await bcrypt.compare(password, userExists.password);
  console.log("isPasswordMatch", isPasswordMatch);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Create JWT token
  const token = jwt.sign({ userId: userExists._id, isAdmin:userExists.isAdmin, permissions: userExists.permissions }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });


  // Return user info and token
  res.status(200).json({
    message: "User login successfully",
    _id: userExists._id,
    name: userExists.name,
    email: userExists.email,
    token: token, // Send the JWT token to the client
  });
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).send(); // No content to return
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optionally check if an email is being changed and ensure it's unique
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ message: "Email is already in use" });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save(); // Save the updated user
    res.json(user); // Return the updated user object
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

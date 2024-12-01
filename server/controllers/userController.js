const User = require("../models/User");
const bcrypt = require("bcrypt");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      collegeEmail,
      password,
      enrollmentNumber,
      branch,
      year,
      interestedTags,
    } = req.body;

    // Check for required fields
    if (
      !name ||
      !collegeEmail ||
      !password ||
      !enrollmentNumber ||
      !branch ||
      !year
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ collegeEmail });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    const existingUserWithEnrollment = await User.findOne({ enrollmentNumber });
    if (existingUserWithEnrollment) {
      return res
        .status(400)
        .json({ error: "User already exists with this Enrollment Number" });
    }

    // Create a new user
    const user = new User({
      name,
      collegeEmail,
      password,
      enrollmentNumber,
      branch,
      year: new Date(year), // Convert year to Date format
      interestedTags: interestedTags || [],
    });

    // Save user to database
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { collegeEmail, password } = req.body;

  try {
    // Find user by college email
    const user = await User.findOne({ collegeEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the input password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Successful login response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};


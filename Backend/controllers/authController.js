const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    console.log("Registration request received:", req.body);

    // Check if user exists (case-insensitive)
    const userExists = await User.findOne({
      $or: [{ email: new RegExp(`^${email}$`, "i") }, { username: new RegExp(`^${username}$`, "i") }],
    });

    if (userExists) {
      console.log("User already exists:", userExists);
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ username, name, email, password });
    console.log("User registered:", user);

    // Generate token
    const token = generateToken(user._id);

    // Respond with the token and user details
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};






exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request received for email:", email);

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" }); // Generic error for security
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" }); // Generic error for security
    }

    // Generate token
    const token = generateToken(user._id);

    // Respond with token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};





exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user: { id: user._id, username: user.username, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};


import userModel from "../Models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";
import createToken from "../utils/generateToken.js";

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({
          success: false,
          message: "User not found, please register a new user",
        });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token with user role
    const token = createToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "email" : "username";
      return res
        .status(409)
        .json({
          success: false,
          message: `User with this ${conflictField} already exists. Please choose a different ${conflictField}.`,
        });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please use a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a strong password, at least 8 characters",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const user = await newUser.save();
    const token = createToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error. Please try again later.",
      });
  }
};

export { loginUser, registerUser };

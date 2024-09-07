import userModel from '../Models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import 'dotenv/config';

// Create token
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found, please register a new user" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
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
            }
        });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists, please login" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please use a valid email' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password, at least 8 characters' });
        }

        // Hash user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Defaults to 'user' if role is not provided
        });

        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id, user.role);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

export { loginUser, registerUser };

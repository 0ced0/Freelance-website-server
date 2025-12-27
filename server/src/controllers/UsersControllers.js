import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/UsersDB.js';
import freeLancers from "../models/freeLancersDB.js";
import { UsersIcon } from "@heroicons/react/16/solid";

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
        // after saving the user
        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });
        res.status(201).json({ msg: 'User registered successfully', token, user: { username: user.username, email: user.email } });


    } catch (err) {

        if (err.code === 11000) {
            return res.status(400).json({
                type: "DUPLICATE_KEY",
                field: Object.keys(err.keyPattern)[0],
                msg: `Duplicate value for field: ${Object.keys(err.keyPattern)[0]}`
            });
        }

        return res.status(500).json({
            type: "SERVER_ERROR",
            msg: "Something went wrong"
        });
    }

    res.status(500).json({ type: "SERVER_ERROR", msg: "Something went wrong" });
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body; // you can also use email if you prefer

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ type: "INVALID_USERNAME", msg: "Username not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ type: "INVALID_PASSWORD", msg: "Incorrect password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

        // Return user info and token
        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                username: user.username,
                email: user.email,
            },
        });


    } catch (err) {
        console.error("🔥 LOGIN ERROR:", err);
        res.status(500).json({ type: "SERVER_ERROR", msg: "Something went wrong" });
    }
};


export const checkUser = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
        const data = jwt.verify(token, "SECRET123");
        const user = await User.findById(data.id).select("-password");
        res.json(user);
    } catch {
        res.status(401).json({ msg: "Invalid token" });
    }
};

export const registerFreeLancer = async (req, res) => {
    try {
        const newFreeLancer = await freeLancers.create(req.body)
        res.status(201).json(newFreeLancer)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

export const profileVisit = async (req, res) => {
    const { id } = req.params;
    try {
        const freelancer = await User.findByIdAndUpdate(
            id,
            { $inc: { visits: 1 } },
            { new: true }
        );

        if (!freelancer) return res.status(404).json({ msg: "Freelancer not found" });

        res.json({ visits: freelancer.visits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
    }
}

export const fetchFreeLancers = async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
}


export const updateFreeLancer = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedFreeLancer = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedFreeLancer) {
            return res.status(404).json({ msg: "Freelancer not found" });
        }

        res.status(200).json(updatedFreeLancer);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const fetchPopularFreeLancers = async (req, res) => {
    try {
        const result = await User.aggregate([
            { $sort: { visits: -1 } },
            { $limit: 5 }
        ])
        res.status(200).json(result)
        console.log(result)
    } catch (err) {
        return (console.log(err))
    }
}
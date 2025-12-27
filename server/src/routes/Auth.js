import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UsersDB.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ msg: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashed });
        await user.save();

        res.json({ msg: "User registered!" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "Invalid username" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Wrong password" });

        const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "7d" });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// CHECK LOGGED IN USER
// router.get("/me", 

export default router;

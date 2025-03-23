const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users");

async function createUser(req, res) {
    try {
        const userData = req.body;
        const { username, password, email, phone, role } = userData;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone number must be exactly 10 digits." });
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const existingUser = await User.findOne({
            $or: [{ username: username }, { email: email }, { phone: phone }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username, email, or phone number already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const createdUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone,
            role: role
        });

        // Save the user to the database
        const savedUser = await createdUser.save();

        res.status(201).json({ user: savedUser, message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createUser };

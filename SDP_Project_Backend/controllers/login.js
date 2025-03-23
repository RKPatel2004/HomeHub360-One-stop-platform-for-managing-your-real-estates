const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if the user is the hardcoded admin
        if (email === "admin@gmail.com" && password === "admin123") {
            const token = jwt.sign(
                {
                    id: "admin_id", // You can use a static or dummy ID
                    username: "Admin",
                    email: email,
                    role: "admin"
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.json({ token, user: { id: "admin_id", username: "Admin", email, role: "admin" } });
        }

        // Check for normal users in the database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, user: existingUser });
    } catch (error) {
        res.status(401).json({ message: "Invalid Credentials" });
    }
}

module.exports = { login };

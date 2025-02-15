const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

async function login(req, res) {
    try {
        const { email, password } = req.body;

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
        console.log("hello",existingUser)
        res.json({ token, user: existingUser });
    } catch (error) {
        res.status(401).json({ message: "Invalid Credentials" });
    }
}

module.exports = { login };
const User = require('../models/user.model');

const crypto = require('crypto');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).send({ message: "User not found" });

        if (user.password !== password) {
            return res.status(401).send('Invalid password');
        }

        // const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');
        // res.send({ token });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

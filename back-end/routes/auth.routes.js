const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const User = require('../models/user.model');

// Register and Login routes
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            role: user.role // Send user role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();

        res.json({ message: 'User registered successfully', role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;

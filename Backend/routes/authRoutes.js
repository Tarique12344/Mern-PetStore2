// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', async (req, res) => {
  console.log('Received signup request with body:', req.body); // <-- logs request body

  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    console.log(`User created with email: ${email}`); // <-- logs success
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error:', err.message); // <-- logs error
    res.status(400).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('Received login request with body:', req.body); // <-- logs login attempt

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    console.log('Login failed: User not found for email:', email);
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    console.log('Login failed: Password mismatch for email:', email);
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  console.log(`Login successful for email: ${email}`);
  res.json({ token });
});

module.exports = router;

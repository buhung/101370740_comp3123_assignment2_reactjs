const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST: Sign up
router.post('/signup', async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password 
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//POST: Login
router.post('/login', async (req, res) => {
    //Check for existing user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    //Password validatino
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.BULAT228);
    res.header('auth-token', token).json({ token: token, user: user._id, message: 'Logged in successfully' });
});

module.exports = router;
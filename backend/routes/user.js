const express = require('express');
const User_router = express.User_router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');

User_router.post('/', jwtMiddleware, async (req, res) => {
  const { name, image, dob, email, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserId = req.user.role === 'manager' ? req.user.id : null;
    const newUser = new User({
      name,
      image,
      dob,
      email,
      phoneNumber,
      password: hashedPassword,
      managers: newUserId,
    });

    await newUser.save();

    if (newUserId) {
      const manager = await manager.findByIdAndUpdate(newUserId, {
        $push: { users: newUser._id },
      });
    }

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

User_router.get('/', jwtMiddleware, async (req, res) => {
  try {
    const users = await User.find({ managers: req.user.id });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = User_router;

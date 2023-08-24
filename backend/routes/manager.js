const express = require('express');
const Manager_router = express.Manager_router();
const bcrypt = require('bcrypt');
const Manager = require('../models/Manager');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');

Manager_router.post('/', jwtMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = new Manager({
      username,
      password: hashedPassword,
    });

    await newManager.save();
    res.status(201).send({ message: 'Manager created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Manager_router.get('/users', jwtMiddleware, async (req, res) => {
  try {
    const users = await User.find().populate('managers');
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Manager_router.put('/users/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    res.send({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Manager_router.delete('/users/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = Manager_router;

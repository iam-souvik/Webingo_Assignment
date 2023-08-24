const express = require('express');
const AdminAdminrouter = express.Adminrouter();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Manager = require('../models/Manager');
const jwtMiddleware = require('../middleware/jwtMiddleware');

Adminrouter.post('/', jwtMiddleware, async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).send({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Adminrouter.get('/managers', jwtMiddleware, async (req, res) => {
  try {
    const managers = await Manager.find().populate('admins');
    res.send(managers);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Adminrouter.put('/managers/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Manager.findByIdAndUpdate(id, { password: hashedPassword });
    res.send({ message: 'Manager updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

Adminrouter.delete('/managers/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await Manager.findByIdAndDelete(id);
    res.send({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = Adminrouter;

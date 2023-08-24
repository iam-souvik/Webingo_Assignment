const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).send({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ role: 'admin' }, 'secretKey');
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;

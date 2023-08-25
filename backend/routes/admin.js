const express = require('express');
const adminRoutes = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const { authorize } = require('../middleware/authorize.middleware');


// adminRoutes.use(authorize(['admin']))

adminRoutes.post('/', authorize, async (req, res) => {
  const { name, image, dob, email,role, phoneNumber, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({
      name,
      image,
      dob,
      email,
      role,
      phoneNumber,
      password: hashedPassword,
      
    });

    await newUser.save();

  

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

adminRoutes.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'admin' });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

adminRoutes.delete('/delete:id', authorize, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

adminRoutes.patch('/:id', authorize, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User update successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = adminRoutes;

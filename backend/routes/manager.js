const express = require('express');
const managerRoutes = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const { authorize } = require('../middleware/authorize.middleware');


managerRoutes.use(authorize(['admin']))

managerRoutes.post('/', authorize, async (req, res) => {
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
      managers: newUserId,
    });

    await newUser.save();

  

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

managerRoutes.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'manager' });
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

managerRoutes.delete('/delete:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

managerRoutes.patch('/:id', authorize, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User update successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = managerRoutes;

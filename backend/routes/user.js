const express = require('express');
const User_router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const { authorize } = require('../middleware/authorize.middleware');





User_router.post('/', authorize(['mananger']), async (req, res) => {
  const { name, image, dob, email, phoneNumber, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User with this email already exists' });
    } 

      const hashedPassword = await bcrypt.hash(password, 10);
     
      const newUser = new User({
        name,
        image,
        dob,
        email,
        phoneNumber,
        password: hashedPassword,
      });

      await newUser.save();
    
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


User_router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.send({users, message: "users getting"});
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

User_router.delete('/delete:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: ' ✅ User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

User_router.patch('/update:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User update successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = User_router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const managerRoutes = require('./routes/manager');
const userRoutes = require('./routes/user');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/webingo_assignment', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(` ✅ Server is running on port ${PORT}`);
});

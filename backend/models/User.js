const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  dob: { type: Date },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ["admin", "manager", 'user']
},
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

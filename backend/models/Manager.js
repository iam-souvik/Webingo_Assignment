const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ["admin", "manager", 'user']
},
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;

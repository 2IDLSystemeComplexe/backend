const mongoose = require('mongoose');

const options = { discriminatorKey: 'role', collection: 'users' };
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'pharmacist', 'admin'],
    default: 'patient'
  },
  resetCode: {type: String},
  resetCodeExpires: {type: Date}

}, options);

module.exports = mongoose.model('User', UserSchema);
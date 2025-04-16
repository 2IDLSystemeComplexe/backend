const mongoose = require('mongoose');
const User = require('./Users');

const adminSchema = new mongoose.Schema({
  level: String,
});

module.exports = User.discriminator('admin', adminSchema);

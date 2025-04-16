const mongoose = require('mongoose');
const User = require('./Users');

const pharmacistSchema = new mongoose.Schema({
  phone: String,
  pharmacyName: String,
  localisation: {
    street: { type: String, required: true },
    city: { type: String, required: true }
  }
});

module.exports = User.discriminator('pharmacist', pharmacistSchema);

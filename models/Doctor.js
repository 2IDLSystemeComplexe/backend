const mongoose = require('mongoose');
const User = require('./Users');
const Appointment = require('./Appointment'); // 👈 Import

const doctorSchema = new mongoose.Schema({
  specialization: String,
  image: { type: String }, 
  degree: { type: String }, 
  experience: { type: Number },
  phone: String,
  localisation: {
    street: { type: String, required: true },
    city: { type: String, required: true }
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: false
    },
    start: { type: String, required: false },
    end: { type: String, required: false }
  }]
});

doctorSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await Appointment.deleteMany({ doctor: doc._id });
  }
  next();
});



module.exports = User.discriminator('doctor', doctorSchema);

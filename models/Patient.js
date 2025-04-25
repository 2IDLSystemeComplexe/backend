const mongoose = require('mongoose');
const User = require('./Users');
const Appointment = require('./Appointment'); 

const patientSchema = new mongoose.Schema({
  medicalHistory: String,
  phone: String,
  localisation: {
    street: { type: String, required: false },
    city: { type: String, required:false}
  },
  age: Number,
  gender:  {
    type: String,
    enum: ['Male', 'Female']}
});

patientSchema.pre('findOneAndDelete', async function(next) {
  const patient = await this.model.findOne(this.getQuery());
  if (patient) {
    await Appointment.deleteMany({ patient: patient._id });
  }
  next();
});

module.exports = User.discriminator('patient', patientSchema);

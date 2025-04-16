// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/Users');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/myapp';

mongoose.connect(MONGO_URI)
  .then(async () => {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      username: 'AdminUser',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error creating admin:', err);
    mongoose.disconnect();
  });

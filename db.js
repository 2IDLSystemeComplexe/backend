const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/myapp';
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
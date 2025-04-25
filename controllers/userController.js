// controllers/userController.js
const User = require('../models/Users');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const role = require('../middleware/role');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    const patient=new Patient({username,email,password:hashedPassword});
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
    console.log(err);
    console.log(SECRET_KEY);
  }
};



exports.requestResetPassword= async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const resetCode = crypto.randomBytes(3).toString('hex'); 
  const expiresAt = Date.now() + 15 * 60 * 1000; 

  user.resetCode = resetCode;
  user.resetCodeExpires = expiresAt;
  await user.save();

  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Code',
    text: `Your reset code is: ${resetCode}`
  };

  await transporter.sendMail(mailOptions);

  res.json({ message: 'Reset code sent to email' });
};



exports.resetPassword =async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || user.resetCodeExpires < Date.now()) {
    return res.status(400).json({ error: 'Invalid or expired reset code' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = undefined;
  user.resetCodeExpires = undefined;
  await user.save();

  res.json({ message: 'Password successfully reset' });
}

exports.getUsersByRole = async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    const users = await User.find({ role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.profile = (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
};



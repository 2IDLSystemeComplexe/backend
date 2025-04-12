const express = require('express');
const connectDB = require('./db');
const User = require('./models/Users');
const bcrypt = require('bcryptjs');
require('dotenv').config();



const app = express();
const PORT = 3000;


connectDB();


app.use(express.json());



app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const auth = require('./middleware/auth');

app.get('/api/profile', auth, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

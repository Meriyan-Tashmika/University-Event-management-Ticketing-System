const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Database එකට Connect වීම
mongoose.connect('mongodb://localhost:27017/unievents')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Member 1 ගේ Auth Routes එකතු කිරීම
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));
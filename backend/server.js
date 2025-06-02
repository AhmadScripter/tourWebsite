require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const helmet = require('helmet')
const cors = require('cors');

const adminAuth = require('./routes/adminAuth');
const tourRoute = require('./routes/tourRoute');

const app = express();
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', adminAuth);
app.use('/api/tours', tourRoute);


const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
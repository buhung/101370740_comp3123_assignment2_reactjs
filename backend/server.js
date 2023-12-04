require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRouter = require('./routes/employees');
const userRouter = require('./routes/users');
const path = require('path');


const app = express();

//Connect to MongoDB

mongoose.connect('mongodb://mongodb:27017/yourdbname', {
    // Use your MongoDB connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.use('/employees', employeeRouter);

app.use('/api/users', userRouter);

app.listen(3000, () => console.log('Server Started'));
const express = require('express');
const dotenv = require('dotenv');
const app = express();

// Load the env variables.....
dotenv.config({ path: './config/config.env' });

// Route files.....
const bootcamps = require('./routes/bootcamps');
app.use('/api/v1/bootcamps',bootcamps)


const PORT = 5000;

// Listening on the port......
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
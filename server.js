const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload') 

const connectDB = require('./config/db')

// Load the env variables.....
dotenv.config({ path: './config/config.env' });

// Route file.....
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');

const app = express();

// Body Parser.....
app.use(express.json())

//Dev logging middleware using morgan.....
 app.use(morgan('dev'))


// Connecting the db 
connectDB();

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//Mount the routers.....
app.use('/api/v1/bootcamps',bootcamps)
app.use('/api/v1/courses',courses)
app.use('/api/v1/auth',auth)

// Using the custom error handeling and it must be after the  app.use('/api/v1/bootcamps',bootcamps)
// Reason for that becoz we are using next() in the route controllers to pass that error to the middleware
app.use(errorHandler)

const PORT =  5000;

// Listening on the port......
const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle the unhandled rejections.....

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
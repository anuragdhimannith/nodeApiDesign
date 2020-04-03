const mongoose = require('mongoose');

 // This will return a promise so we have to use async await......
const connectDB = async () => {   
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
module.exports = connectDB;
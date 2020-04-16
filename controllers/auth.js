const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');


// @desc Register user
// @route GET /api/v1/auth/register
// @access Public

exports.register = asyncHandler(async(req,res,next) => {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });
    const token = user.getSignedJwtToken();
    res.status(200).json({success: true, token});
})


// @desc Register user
// @route POST /api/v1/auth/login
// @access Public

exports.login = asyncHandler(async(req,res,next) => {
    const { email, password} = req.body;
   // Validate the email and password

   if(!email || !password) {
       return next(new ErrorResponse('Please provide an email and password', 400));
   }

   // Check for user
   const user = await User.findOne({ email }).select('+password');

   if(!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
   }

   // Check if password matched
   console.log("The user",user);
   const isMatch = await user.matchPassword(password);
   if(!isMatch) {
       return next( new ErrorResponse('Invalid credentials',401))
   }

    const token = user.getSignedJwtToken();
    res.status(200).json({success: true, token});
})

const Course = require('../models/Course');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');



//@desc  Get courses
//@route GET /api/v1/courses
//@route GET /api/v1/bootcamps/:bootcampsId/courses
//@acsess Public
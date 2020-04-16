const path = require('path');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geoCoder = require('../utils/geocoder');


//@desc  create a bootcamps
//@route POST /api/v1/bootcamps
//@access Private  
exports.createBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });

});

//@desc  Get all the bootcamps
//@route GET /api/v1/bootcamps
//@access Public  
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc  Get a single bootcamp
//@route GET /api/v1/bootcamps/:id
//@acess Public  
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: bootcamp });

});

//@desc  Update the bootcamp
//@route PUT /api/v1/bootcamps/:id
//@acess Private  
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: bootcamp })

});

//@desc Delete the bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@acess Private  
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    bootcamp.remove();
    res.status(200).json({ success: true, data: {} })
});


//@desc  Get  the bootcamps within a radius
//@route DELETE /api/v1/bootcamps/radius/:zipcode/:distance
//@acess Private  
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    console.log("This is called")
    const { zipcode, distance } = req.params;

    // Get lat/lng from geocoder
    const loc = await geoCoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius  = 3,963 mi / b,378 km
    const radius = distance / 3963
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    });
});



//@desc Upload a photo for a bootcamp
//@route DELETE /api/v1/bootcamps/:id/photo
//@acess Private  
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
    console.log("this is the request")
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    console.log("req files are", req.files)
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400))
    }

    const file = req.files.file;
    //Make sure the image is a photo...
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD},`, 400);
    }

    // Create custome file name.....

    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file Upload`, 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
        res.status(200).json({ success: true, data: file.name })
    });
});

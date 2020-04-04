const Bootcamp = require('../models/Bootcamp')

//@desc  Get all the bootcamps
//@route GET /api/v1/bootcamps
//@acess Public  
exports.getBootcamps = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show all the bootcamps`});
} 

//@desc  Get a single bootcamp
//@route GET /api/v1/bootcamps/:id
//@acess Public  
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `get a particular bootcamps ${req.params.id}`});
}

//@desc  create a bootcamps
//@route POST /api/v1/bootcamps
//@acess Private  
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}

//@desc  Update the bootcamp
//@route PUT /api/v1/bootcamps/:id
//@acess Private  
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Update the bootcamp  ${req.params.id}`});
}

//@desc  Get all the bootcamps
//@route DELETE /api/v1/bootcamps/:id
//@acess Private  
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Deleted the bootcamp with ${req.params.id}`});
}
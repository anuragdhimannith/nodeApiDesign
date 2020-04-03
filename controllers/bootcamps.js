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
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({success: true, msg: `Created a new bootcamp  ${req.params.id}`});
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
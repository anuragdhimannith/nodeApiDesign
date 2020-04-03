const express = require('express');
const router = express.Router();


// Creating the routes....

router.get('/',(req,res) => {
    res.status(400).json({success: true, msg: 'Show all the bootcamps'});
});
router.get('/:id',(req,res) => {
    res.status(400).json({success: true, msg: `get a particular bootcamps ${req.params.id}`});
});
router.put('/:id',(req,res) => {
    res.status(400).json({success: true, meg: `put all the bootcamps ${req.params.id}`});
});

router.post('/',(req,res) => {
    res.status(400).json({success: true, msg: 'Created a new bootcamp'});
});

router.delete('/:id',(req,res) => {
    res.status(400).json({success: true, msg: `Deleted the bootcamp with ${req.params.id}`});
});

module.exports = router;
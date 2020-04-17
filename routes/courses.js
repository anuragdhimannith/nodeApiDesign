const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
const {
    getCourses , getCourse , addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');


router.route('/').get(getCourses).post(protect,addCourse);
router.route('/:id').get(getCourse).put(protect,updateCourse).delete(protect,deleteCourse);
module.exports = router;
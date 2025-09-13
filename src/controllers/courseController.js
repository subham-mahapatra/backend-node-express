import Course from '~/models/courseModel.js';
import catchAsync from '~/utils/catchAsync.js';

export const createCourse = catchAsync(async (req, res) => {
  const { title, description, price, thumbnail, syllabus } = req.body;

  const course = await Course.create({
    title,
    description,
    price,
    thumbnail,
    syllabus,
    tutor: req.user.id // instructor from auth middleware
  });

  return res.status(201).json({
    success: true,
    data: course
  });
});

export const getCourses = catchAsync(async (req, res) => {
  const courses = await Course.find().populate('tutor', 'firstName lastName email');
  return res.json({
    success: true,
    data: courses
  });
});

import Course from '~/models/courseModel.js';
import catchAsync from '~/utils/catchAsync.js';

// Create course
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

// Get all courses
export const getCourses = catchAsync(async (req, res) => {
  const courses = await Course.find().populate('tutor', 'firstName lastName email');
  return res.json({
    success: true,
    data: courses
  });
});

// 🔹 Update course
export const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  // allow only admin or the tutor who created the course
  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  if (req.user.role !== 'admin' && course.tutor.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this course' });
  }

  Object.assign(course, req.body);
  await course.save();

  return res.json({
    success: true,
    data: course
  });
});

// 🔹 Delete course
export const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }
  if (req.user.role !== 'admin' && course.tutor.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this course' });
  }

  await course.deleteOne();

  return res.json({
    success: true,
    message: 'Course deleted successfully'
  });
});

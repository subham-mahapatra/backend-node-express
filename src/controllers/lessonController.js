// src/controllers/lessonController.js
import httpStatus from 'http-status';
import APIError from '~/utils/apiError.js';
import catchAsync from '~/utils/catchAsync.js';
import Lesson from '~/models/lessonModel';
import Course from '~/models/courseModel';

// Create Lesson
export const createLesson = catchAsync(async (req, res) => {
  const { courseId } = req.body;
  
  // Verify course exists and user is owner
  const course = await Course.findById(courseId);
  if (!course) {
    throw new APIError('Course not found', httpStatus.NOT_FOUND);
  }
  if (course.tutor.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new APIError('Not authorized', httpStatus.FORBIDDEN);
  }

  const lesson = await Lesson.create(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
     data:{lesson},
    message: 'Lesson created successfully'
  });
});

// Get Lesson by ID
export const getLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId).lean();
  if (!lesson) {
    throw new APIError('Lesson not found', httpStatus.NOT_FOUND);
  }
  res.json({
    success: true,
     lesson,
    message: 'Lesson retrieved successfully'
  });
});

// Update Lesson
export const updateLesson = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    throw new APIError('Lesson not found', httpStatus.NOT_FOUND);
  }

  const course = await Course.findById(lesson.courseId);
  if (course.tutor.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new APIError('Not authorized', httpStatus.FORBIDDEN);
  }

  Object.assign(lesson, req.body);
  await lesson.save();

  res.json({
    success: true,
     lesson,
    message: 'Lesson updated successfully'
  });
});

// Delete Lesson
export const deleteLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findById(req.params.lessonId);
  if (!lesson) {
    throw new APIError('Lesson not found', httpStatus.NOT_FOUND);
  }

  const course = await Course.findById(lesson.courseId);
  if (course.tutor.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new APIError('Not authorized', httpStatus.FORBIDDEN);
  }

  await lesson.deleteOne();
  res.json({
    success: true,
    data:{},
    message: 'Lesson deleted successfully'
  })
});

// Get All Lessons for a Course (Public)
export const getLessonsByCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const lessons = await Lesson.find({ courseId }).sort({ order: 1 }).lean();
  res.json({
    success: true,
     lessons,
    message: 'Lessons retrieved successfully'
  });
});
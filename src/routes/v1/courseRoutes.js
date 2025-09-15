import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import validate from '~/middlewares/validate';
import {createCourse, getCourses, updateCourse, deleteCourse} from '~/controllers/courseController';

const router = Router();

// Create course (Instructor only)
router.post('/', authenticate('course:create'), catchAsync(createCourse));

// Get all courses (any authenticated user)
router.get('/', catchAsync(getCourses)); 

// Instructor/Admin – update
router.put('/:id', authenticate('course:update'), catchAsync(updateCourse));

// Instructor/Admin – delete
router.delete('/:id', authenticate('course:delete'), catchAsync(deleteCourse));

export default router;

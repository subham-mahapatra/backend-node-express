import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import validate from '~/middlewares/validate';
import {createCourse, getCourses} from '~/controllers/courseController';

const router = Router();

// Create course (Instructor only)
router.post('/', authenticate('instructor'), catchAsync(createCourse));

// Get all courses (any authenticated user)
router.get('/', authenticate(), catchAsync(getCourses));

export default router;

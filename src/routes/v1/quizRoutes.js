import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import validate from '~/middlewares/validate';
import { createQuiz, getQuizByCourse } from '~/controllers/quizController';
const router = Router();

// Create quiz (Instructor only)
router.post('/', authenticate('instructor'), catchAsync(createQuiz));
// Get quizzes for a course (Students/Users)
router.get('/:courseId', authenticate(), catchAsync(getQuizByCourse));

export default router;

import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import validate from '~/middlewares/validate';
import { createQuiz, getQuizByCourse, updateQuiz, deleteQuiz } from '~/controllers/quizController';
const router = Router();

// Get all quizzes for a course (students can view)
router.get('/course/:courseId', catchAsync(getQuizByCourse));

// Create a quiz (only instructor/admin)
router.post('/', authenticate('quiz:create'), catchAsync(createQuiz));

// Update a quiz (only creator or admin)
router.put('/:quizId',authenticate('quiz:update'), catchAsync(updateQuiz));

// Delete a quiz (only creator or admin)
router.delete('/:quizId',authenticate('quiz:delete'), catchAsync(deleteQuiz));
export default router;

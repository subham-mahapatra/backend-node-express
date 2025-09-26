import express from 'express';
import authenticate from '~/middlewares/authenticate.js';
import * as lessonController from '~/controllers/lessonController.js';


const router = express.Router();

// Only tutor or admin can manage lessons
router.use(authenticate('course:update')); // or check ownership in controller

router.post('/',  lessonController.createLesson);
router.get('/:lessonId',  lessonController.getLesson);
router.put('/:lessonId',  lessonController.updateLesson);
router.delete('/:lessonId', lessonController.deleteLesson);

// Public: get all lessons for a course
router.get('/course/:courseId', lessonController.getLessonsByCourse);

export default router; 

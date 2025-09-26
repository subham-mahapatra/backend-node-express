import express from 'express';
import validate from '~/middlewares/validate.js';
import authenticate from '~/middlewares/authenticate.js';
// import * as courseValidation from '~/validations/courseValidation.js';
import * as courseController from '~/controllers/courseController.js';

const router = express.Router();
router.post('/:courseId/reviews', authenticate(), courseController.addReview); 
router.get('/:courseId/reviews', authenticate(), courseController.getCourseReviews); 
router.get('/all', authenticate(), courseController.getAllCourses);

router.get('/wishlist', authenticate(), courseController.getWishlist); 

router.get('/categories/:categoryName/courses', authenticate(), courseController.getCoursesByCategory);

// Public routes
router.get('/',  courseController.searchCourses);
router.get('/:courseId',  courseController.getCourseById);
router.get('/:courseId/related',  courseController.getRelatedCourses);

// Student routes
router.use(authenticate()); // all below require login

router.post('/enroll',  courseController.enrollInCourse);
router.get('/enrollments/me', courseController.getUserEnrollments);
router.post('/:courseId/lessons/:lessonId/complete',  courseController.markLessonComplete);
router.post('/wishlist',  courseController.addToWishlist);
router.delete('/wishlist/:courseId',  courseController.removeFromWishlist);

// Tutor/Admin routes
router.use(authenticate('course:create')); // or check role in controller

router.post('/',  courseController.createCourse);
router.put('/:courseId',  courseController.updateCourse);
router.delete('/:courseId',  courseController.deleteCourse);

export default router;
import { Router } from 'express';
import authenticate from '~/middlewares/authenticate.js';
import * as tutorController from '~/controllers/tutorController.js';
import catchAsync from '~/utils/catchAsync.js';

const router = Router();

// Only tutors/instructors allowed (role-based)
router.get(
  '/earnings',
  authenticate('tutor:read'), // permission
  catchAsync(tutorController.getTutorEarnings)
);

router.get(
  '/uploads',
  authenticate('tutor:read'),
  catchAsync(tutorController.getTutorUploads)
);

router.get(
  '/students',
  authenticate('tutor:read'),
  catchAsync(tutorController.getTutorStudents)
);

export default router;

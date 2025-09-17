import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import progressController from '~/controllers/progressController';

const router = Router();

// Create progress
router.post(
  '/',
  authenticate('progress:create'),
  catchAsync(progressController.createProgress)
);

// Get all (admin)
router.get(
  '/',
  authenticate('progress:read'),
  catchAsync(progressController.getProgresses)
);

// Get one user-course progress
router.get(
  '/:userId/:courseId',
  authenticate('user:read'),
  catchAsync(progressController.getProgress)
);

// Update
router.put(
  '/:userId/:courseId',
  authenticate('user:read'),
  catchAsync(progressController.updateProgress)
);

// Delete
router.delete(
  '/:userId/:courseId',
  authenticate('progress:delete'),
  catchAsync(progressController.deleteProgress)
);

export default router;
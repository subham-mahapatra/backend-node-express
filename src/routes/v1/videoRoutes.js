import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import { uploadVideo, getVideosByCourse, updateVideo, deleteVideo, streamVideo } from '~/controllers/videoController'; 
import multer from 'multer'; 

const router = Router();

const upload = multer({ dest: 'uploads/videos/' });

// Upload video (admin/instructor)
router.post(
  '/',
  authenticate('video:create'),
  upload.single('video'),
  catchAsync(uploadVideo)
);

// Get videos by course
router.get(
  '/course/:courseId',
  authenticate('video:read'),
  catchAsync(getVideosByCourse)
);

// Update video metadata
router.put(
  '/:id',
  authenticate('video:update'),
  catchAsync(updateVideo)
);

// Delete video
router.delete(
  '/:id',
  authenticate('video:delete'),
  catchAsync(deleteVideo)
);

// Stream endpoint
router.get(
  '/stream/:id',
  authenticate('video:read'),
  catchAsync(streamVideo)
);

export default router;

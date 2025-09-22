import { Router } from 'express';
import catchAsync from '~/utils/catchAsync';
import authenticate from '~/middlewares/authenticate';
import certificateController from '~/controllers/certificateController.js';

const router = Router();

// Create certificate (restricted – maybe admin/instructor)
router.post(
  '/',
  authenticate('certificate:create'),
  catchAsync(certificateController.createCertificate)
);

// Get certificates by userId (any authenticated user)
router.get(
  '/:userId',
  authenticate(),
  catchAsync(certificateController.getCertificatesByUser)
);

// Update certificate
router.put(
  '/:id',
  authenticate('certificate:update'),
  catchAsync(certificateController.updateCertificate)
);

// Delete certificate
router.delete(
  '/:id',
  authenticate('certificate:delete'),
  catchAsync(certificateController.deleteCertificate)
);

export default router;

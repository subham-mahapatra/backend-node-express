import Certificate from '~/models/certificateModel.js';

/**
 * Create a certificate (dummy MVP)
 */
const createCertificate = async (req, res) => {
  const { userId, courseId, certificateName } = req.body;

  const certificate = await Certificate.create({
    userId,
    courseId,
    certificateName
  });

  res.status(201).json({
    success: true,
    data: certificate
  });
};

/**
 * Get all certificates for a user
 */
const getCertificatesByUser = async (req, res) => {
  const { userId } = req.params;
  const certificates = await Certificate.find({ userId }).populate('courseId');
  res.json({
    success: true,
    data: certificates
  });
};

/**
 * Update certificate (MVP use case – maybe update status or name)
 */
const updateCertificate = async (req, res) => {
  const { id } = req.params;
  const updated = await Certificate.findByIdAndUpdate(id, req.body, { new: true });
  res.json({
    success: true,
    data: updated
  });
};

/**
 * Delete certificate
 */
const deleteCertificate = async (req, res) => {
  const { id } = req.params;
  await Certificate.findByIdAndDelete(id);
  res.json({
    success: true,
    message: 'Certificate deleted successfully'
  });
};

export default {
  createCertificate,
  getCertificatesByUser,
  updateCertificate,
  deleteCertificate
};

// controllers/tutorController.js
import Course from '~/models/courseModel.js';
import Payment from '~/models/paymentModel.js';
import Progress from '~/models/progressModel.js';
import Video from '~/models/videoModel.js';
import Quiz from '~/models/quizModel.js';
import catchAsync from '~/utils/catchAsync.js';

// Earnings for tutor (sum of payments for tutor’s courses)
export const getTutorEarnings = catchAsync(async (req, res) => {
  const tutorId = req.user.id;

  // find all courses created by this tutor
  const courses = await Course.find({ tutor: tutorId }).select('_id');
  const courseIds = courses.map(c => c._id);

  // find all payments for those courses
  const payments = await Payment.find({ course: { $in: courseIds } });

  const totalEarnings = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  res.json({
    success: true,
    data: {
      totalEarnings,
      paymentCount: payments.length
    }
  });
});

// Tutor uploads: videos + quizzes
export const getTutorUploads = catchAsync(async (req, res) => {
  const tutorId = req.user.id;

  const videos = await Video.find({ uploadedBy: tutorId });
  const quizzes = await Quiz.find({ createdBy: tutorId });

  res.json({
    success: true,
    data: { videos, quizzes }
  });
});

// Track students for tutor’s courses
export const getTutorStudents = catchAsync(async (req, res) => {
  const tutorId = req.user.id;
  const courses = await Course.find({ tutor: tutorId }).select('_id title');
  const courseIds = courses.map(c => c._id);

  // payments = who enrolled
  const payments = await Payment.find({ course: { $in: courseIds } })
    .populate('userId', 'firstName lastName email');

  // progress for those students
  const progress = await Progress.find({ course: { $in: courseIds } });

  res.json({
    success: true,
    data: {
      courses,
      enrolledStudents: payments,
      progress
    }
  });
});

import Quiz from '~/models/quizModel.js';
import catchAsync from '~/utils/catchAsync.js';

/**
 * Create a quiz
 */
export const createQuiz = catchAsync(async (req, res) => {
  const { course, title, questions } = req.body;

  const quiz = await Quiz.create({
    course,
    title,
    questions,
    createdBy: req.user.id
  });

  return res.status(201).json({
    success: true,
    data: quiz
  });
});

/**
 * Get quizzes by course
 */
export const getQuizByCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const quizzes = await Quiz.find({ course: courseId })
    .populate('createdBy', 'firstName lastName');

  return res.json({
    success: true,
    data: quizzes
  });
});

/**
 * Update a quiz (only creator or admin)
 */
export const updateQuiz = catchAsync(async (req, res) => {
  const { quizId } = req.params;

  // optional: enforce ownership unless admin
  const filter = req.user.role === 'admin'
    ? { _id: quizId }
    : { _id: quizId, createdBy: req.user.id };

  const quiz = await Quiz.findOneAndUpdate(filter, req.body, {
    new: true,
    runValidators: true
  });

  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found or not allowed' });
  }

  return res.json({
    success: true,
    data: quiz
  });
});

/**
 * Delete a quiz (only creator or admin)
 */
export const deleteQuiz = catchAsync(async (req, res) => {
  const { quizId } = req.params;

  const filter = req.user.role === 'admin'
    ? { _id: quizId }
    : { _id: quizId, createdBy: req.user.id };

  const quiz = await Quiz.findOneAndDelete(filter);

  if (!quiz) {
    return res.status(404).json({ success: false, message: 'Quiz not found or not allowed' });
  }

  return res.json({
    success: true,
    message: 'Quiz deleted successfully'
  });
});

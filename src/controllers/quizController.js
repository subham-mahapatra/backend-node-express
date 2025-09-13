import Quiz from '~/models/quizModel.js';
import catchAsync from '~/utils/catchAsync.js';

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

export const getQuizByCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const quizzes = await Quiz.find({ course: courseId }).populate('createdBy', 'firstName lastName');
  return res.json({
    success: true,
    data: quizzes
  });
});

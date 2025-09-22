import httpStatus from 'http-status';
import Progress from '~/models/progressModel';
import APIError from '~/utils/apiError';

// Create progress
const createProgress = async (req, res, next) => {
  try {
    const progress = await Progress.create(req.body);
    res.status(httpStatus.CREATED).json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
};

// Get all progresses (admin usecase)
const getProgresses = async (req, res, next) => {
  try {
    const progresses = await Progress.find().populate('courseId'); //user need to add
    res.json({ success: true, data: progresses });
  } catch (err) {
    next(err);
  }
};

// Get progress by user+course
const getProgress = async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOne({ userId, courseId }).populate(
      'courseId'
    ); //add userID
    if (!progress) {
      throw new APIError('Progress not found', httpStatus.NOT_FOUND);
    }
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
};

// Update progress (e.g. when user completes a lesson)
const updateProgress = async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOneAndUpdate(
      { userId, courseId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!progress) {
      throw new APIError('Progress not found', httpStatus.NOT_FOUND);
    }
    res.json({ success: true, data: progress });
  } catch (err) {
    next(err);
  }
};

// Delete progress
const deleteProgress = async (req, res, next) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOneAndDelete({ userId, courseId });
    if (!progress) {
      throw new APIError('Progress not found', httpStatus.NOT_FOUND);
    }
    res.json({ success: true, message: 'Progress deleted' });
  } catch (err) {
    next(err);
  }
};

export default {
  createProgress,
  getProgresses,
  getProgress,
  updateProgress,
  deleteProgress,
};

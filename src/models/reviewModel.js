import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// One review per user per course
reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
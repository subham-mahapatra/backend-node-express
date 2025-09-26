import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique wishlist item
wishlistSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
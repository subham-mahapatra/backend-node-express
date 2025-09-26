import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // minutes
    required: true,
    min: 1
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  resources: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['pdf', 'zip', 'link'], 
      default: 'link' 
    }
  }]
}, {
  timestamps: true
});

// Ensure only one lesson per order per course
lessonSchema.index({ courseId: 1, order: 1 }, { unique: true });

export default mongoose.model('Lesson', lessonSchema);
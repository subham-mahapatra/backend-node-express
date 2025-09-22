import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    certificateName: {
      type: String,
      required: true
    },
    issueDate: {
      type: Date,
      default: Date.now
    },
    // later you can add certificate file path, signature, QR etc.
    status: {
      type: String,
      enum: ['issued', 'revoked'],
      default: 'issued'
    }
  },
  { timestamps: true }
);

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;

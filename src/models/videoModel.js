// models/videoModel.js
import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String, required: true }, // e.g. uploads/videos/xyz.mp4
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // instructor/admin
  createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);
export default Video;

import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  thumbnail: { type: String }, // file URL or path
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // instructor
  syllabus: [{ type: String }], // simple list of topics
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;

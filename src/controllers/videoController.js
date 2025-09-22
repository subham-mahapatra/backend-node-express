// controllers/videoController.js
import fs from 'fs';
import path from 'path';
import Video from '~/models/videoModel.js';
import catchAsync from '~/utils/catchAsync.js';
import config from '~/config/config.js';

// Upload new video
export const uploadVideo = catchAsync(async (req, res) => {
  const { title, description, course } = req.body;
  // multer puts file info on req.file
  const filePath = req.file.path;

  const video = await Video.create({
    title,
    description,
    filePath,
    course,
    uploadedBy: req.user.id
  });

  res.status(201).json({ success: true, data: video });
});

// Get all videos for a course
export const getVideosByCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const videos = await Video.find({ course: courseId })
    .populate('uploadedBy', 'firstName lastName');
  res.json({ success: true, data: videos });
});

// Update video metadata (title/description)
export const updateVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ success: true, data: video });
});

// Delete video
export const deleteVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).json({ success: false, message: 'Video not found' });
  }
  fs.unlinkSync(video.filePath); // remove file
  await video.deleteOne();
  res.json({ success: true, message: 'Video deleted' });
});

// Stream video (partial content)
export const streamVideo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) return res.status(404).json({ message: 'Video not found' });

  const filePath = path.resolve(video.filePath);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

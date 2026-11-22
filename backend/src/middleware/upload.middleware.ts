import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config';

const uploadDirectory = path.resolve(process.cwd(), config.uploadDir);

// Ensure upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `waste-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedExtensions.test(ext) && allowedExtensions.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, PNG, and WebP images are allowed.'));
    }
  },
});


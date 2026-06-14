const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { Readable } = require('stream');

// ── Configure Cloudinary ──────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// ── Allowed MIME types ────────────────────────────────────────────────────────
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// ── Multer — store in memory, then stream to Cloudinary ─────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (JPEG, PNG, WEBP, GIF).'), false);
    }
  },
  limits: { fileSize: MAX_SIZE }
});

/**
 * Upload a buffer to Cloudinary via stream.
 * @param {Buffer} buffer - File buffer from multer memoryStorage
 * @param {string} folder  - Cloudinary folder (e.g. 'portfolio/gallery')
 * @returns {Promise<{url: string, publicId: string}>}
 */
function uploadToCloudinary(buffer, folder = 'portfolio') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    );

    // Pipe buffer into Cloudinary stream
    const readable = Readable.from(buffer);
    readable.pipe(stream);
  });
}

/**
 * Delete an image from Cloudinary by its public_id.
 * @param {string} publicId
 */
async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (err) {
    console.error('[Cloudinary] Delete failed:', err.message);
  }
}

module.exports = { upload, uploadToCloudinary, deleteFromCloudinary };

const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/auth');
const { upload, uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/gallery — public
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('[Gallery GET]', err.message);
    res.status(500).json({ error: 'Failed to fetch gallery.' });
  }
});

// POST /api/gallery — admin only
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }
    const { title, caption, category } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }

    // Upload buffer to Cloudinary
    const { url, publicId } = await uploadToCloudinary(
      req.file.buffer,
      'portfolio/gallery'
    );

    const item = new Gallery({
      title: title.trim(),
      caption: (caption || title).trim(),
      category: category || 'events',
      imageUrl: url,
      publicId
    });
    await item.save();

    res.status(201).json(item);
  } catch (err) {
    console.error('[Gallery POST]', err.message);
    res.status(500).json({ error: 'Failed to upload image. Please try again.' });
  }
});

// DELETE /api/gallery/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found.' });

    // Delete from Cloudinary
    await deleteFromCloudinary(item.publicId);

    await item.deleteOne();
    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    console.error('[Gallery DELETE]', err.message);
    res.status(500).json({ error: 'Failed to delete item.' });
  }
});

module.exports = router;

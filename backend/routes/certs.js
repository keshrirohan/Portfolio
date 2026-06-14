const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const authMiddleware = require('../middleware/auth');
const { upload, uploadToCloudinary, deleteFromCloudinary } = require('../middleware/upload');

// GET /api/certs — public
router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    console.error('[Certs GET]', err.message);
    res.status(500).json({ error: 'Failed to fetch certificates.' });
  }
});

// POST /api/certs — admin only
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, type, date, certLink, color } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (!issuer || !issuer.trim()) {
      return res.status(400).json({ error: 'Issuer is required.' });
    }

    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      // Upload image to Cloudinary
      const result = await uploadToCloudinary(
        req.file.buffer,
        'portfolio/certificates'
      );
      imageUrl = result.url;
      publicId = result.publicId;
    } else if (certLink && certLink.startsWith('http')) {
      // If no file uploaded, use certLink as the image URL too (Cloudinary/external)
      imageUrl = certLink;
    }

    const cert = new Certificate({
      title: title.trim(),
      issuer: issuer.trim(),
      type: type || 'course',
      date: (date || '').trim(),
      imageUrl,
      publicId,
      certLink: (certLink || '').trim(),
      color: color || 'blue'
    });
    await cert.save();

    res.status(201).json(cert);
  } catch (err) {
    console.error('[Certs POST]', err.message);
    res.status(500).json({ error: 'Failed to save certificate. Please try again.' });
  }
});

// DELETE /api/certs/:id — admin only
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certificate not found.' });

    // Delete image from Cloudinary if it was uploaded there
    if (cert.publicId) {
      await deleteFromCloudinary(cert.publicId);
    }

    await cert.deleteOne();
    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    console.error('[Certs DELETE]', err.message);
    res.status(500).json({ error: 'Failed to delete certificate.' });
  }
});

module.exports = router;

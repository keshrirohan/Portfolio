const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true },
  caption:   { type: String, trim: true, default: '' },
  category:  {
    type: String,
    enum: ['events', 'hackathon', 'personal', 'work'],
    default: 'events'
  },
  imageUrl:  { type: String, required: true },   // Cloudinary secure_url
  publicId:  { type: String, default: '' }       // Cloudinary public_id for deletion
}, { timestamps: true });

module.exports = mongoose.model('Gallery', GallerySchema);

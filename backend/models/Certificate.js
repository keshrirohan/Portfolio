const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  issuer:   { type: String, required: true, trim: true },
  type:     {
    type: String,
    enum: ['internship', 'hackathon', 'achievement', 'conference', 'course'],
    default: 'course'
  },
  date:     { type: String, default: '' },
  imageUrl: { type: String, default: '' },   // Cloudinary secure_url (or external URL)
  publicId: { type: String, default: '' },   // Cloudinary public_id for deletion
  certLink: { type: String, default: '' },   // Link to view certificate externally
  color:    {
    type: String,
    enum: ['blue', 'purple', 'cyan', 'teal', 'orange', 'pink'],
    default: 'blue'
  }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', CertificateSchema);

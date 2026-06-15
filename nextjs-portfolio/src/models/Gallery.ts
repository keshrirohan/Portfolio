import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  category: string;
  description?: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

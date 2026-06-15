import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  issueDate: string;
  category: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  createdAt: Date;
}

const CertificateSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);

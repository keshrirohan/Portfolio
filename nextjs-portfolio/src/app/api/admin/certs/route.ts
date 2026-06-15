import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certificate from '@/models/Certificate';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const issuer = formData.get('issuer') as string;
    const issueDate = formData.get('issueDate') as string;

    if (!file || !title || !category || !issuer || !issueDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadImageToCloudinary(buffer, 'portfolio/certs');

    await connectDB();
    const newCert = await Certificate.create({
      title,
      category,
      issuer,
      issueDate,
      imageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.publicId
    });

    return NextResponse.json(newCert, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await connectDB();
    const cert = await Certificate.findById(id);
    if (!cert) return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });

    await deleteImageFromCloudinary(cert.cloudinaryPublicId);
    await Certificate.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Certificate deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

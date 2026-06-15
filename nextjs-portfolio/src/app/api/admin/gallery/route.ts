import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gallery from '@/models/Gallery';
import { uploadImageToCloudinary, deleteImageFromCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadImageToCloudinary(buffer, 'portfolio/gallery');

    await connectDB();
    const newImage = await Gallery.create({
      title,
      category,
      description,
      imageUrl: uploadResult.url,
      cloudinaryPublicId: uploadResult.publicId
    });

    return NextResponse.json(newImage, { status: 201 });
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
    const image = await Gallery.findById(id);
    if (!image) return NextResponse.json({ error: 'Image not found' }, { status: 404 });

    await deleteImageFromCloudinary(image.cloudinaryPublicId);
    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Image deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

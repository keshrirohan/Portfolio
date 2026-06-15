import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    await connectDB();
    
    const query = category && category !== 'All' ? { category } : {};
    const images = await Gallery.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(images, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

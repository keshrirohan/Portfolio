import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Certificate from '@/models/Certificate';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    await connectDB();
    
    const query = category && category !== 'All' ? { category } : {};
    const certs = await Certificate.find(query).sort({ issueDate: -1 });
    
    return NextResponse.json(certs, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

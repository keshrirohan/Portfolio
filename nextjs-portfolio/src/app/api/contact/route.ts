import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    await connectDB();
    
    const newContact = await Contact.create(data);
    
    return NextResponse.json({ message: 'Message sent successfully!', id: newContact._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    await connectDB();
    const count = await Admin.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Admin already exists' }, { status: 200 });
    }

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      return NextResponse.json({ error: 'Missing ADMIN_USERNAME or ADMIN_PASSWORD in env' }, { status: 500 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await Admin.create({ username, passwordHash });

    return NextResponse.json({ message: 'Admin created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

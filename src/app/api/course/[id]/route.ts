// app/api/course/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/course/${id}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in route handler:', error);
    return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
  }
}

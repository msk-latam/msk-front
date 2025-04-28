import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    try {
        const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/navbar?lang=int`, {
            next: { revalidate: 30 },
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in route handler:', error);
        return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
    }
}

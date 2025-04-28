
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	try {
		const res = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}`, {
			next: { revalidate: 30 },
		});
		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error in route handler:', error);
		return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
	}
}

import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;
	const { searchParams } = new URL(req.url);
	const country = searchParams.get('country') || 'ar'; // default a Argentina si no viene

	try {
		const res = await fetch(
			`https://cms1.msklatam.com/wp-json/msk/v1/product/${slug}?country=${country}`,
			{ next: { revalidate: 30 } }
		);

		const data = await res.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error in route handler:', error);
		return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
	}
}
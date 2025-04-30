import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const ipRes = await fetch('https://api.ipify.org?format=json');
		const ipData = await ipRes.json();
		const ip = ipData.ip;

		const geoRes = await fetch(`https://pro.ip-api.com/json/${ip}?fields=61439&key=OE5hxPrfwddjYYP`);
		if (!geoRes.ok) throw new Error('Failed to fetch geo info');

		const geo = await geoRes.json();

		return NextResponse.json({
			ip,
			country: geo.countryCode?.toLowerCase() || '',
			name: geo.country || '',
		});
	} catch (error) {
		console.error('❌ /api/get-country error:', error);
		return NextResponse.json(
			{ ip: '', country: '', name: '' },
			{ status: 500 }
		);
	}
}

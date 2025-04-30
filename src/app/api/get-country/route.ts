{/*import { NextResponse } from 'next/server';

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
}*/ }


{/*export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const forwarded = req.headers.get('x-forwarded-for');
		let ip = forwarded?.split(',')[0] || '';

		// Fallback en desarrollo local
		if (process.env.NODE_ENV === 'development' || ip === '::1' || ip === '127.0.0.1') {
			ip = '190.100.50.25'; // ← tu IP pública simulada (cambiá si querés simular otro país)
		}

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
		return NextResponse.json({ ip: '', country: '', name: '' }, { status: 500 });
	}
}*/ }


{/*export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

const blockedCountries = ['us', 'br', 'fr']; // agregar más si querés

export async function GET(req: NextRequest) {
	try {
		let ip = req.headers.get('x-forwarded-for')?.split(',')[0] || '';

		if (!ip || ip === '::1' || ip === '127.0.0.1') {
			if (process.env.NODE_ENV === 'development') {
				ip = '190.100.50.25'; // IP ficticia para testing local
			} else {
				throw new Error('No IP available');
			}
		}

		const geoRes = await fetch(`https://pro.ip-api.com/json/${ip}?fields=61439&key=OE5hxPrfwddjYYP`);
		if (!geoRes.ok) throw new Error('Failed to fetch geo info');

		const geo = await geoRes.json();
		const country = geo.countryCode?.toLowerCase() || '';
		const name = geo.country || '';

		// Si está en la lista de países bloqueados
		if (blockedCountries.includes(country)) {
			return NextResponse.json(
				{ ip, country, name, blocked: true },
				{ status: 403 }
			);
		}

		return NextResponse.json({
			ip,
			country,
			name,
			blocked: false,
		});
	} catch (error) {
		console.error('❌ /api/get-country error:', error);
		return NextResponse.json(
			{ ip: '', country: '', name: '', blocked: true },
			{ status: 500 }
		);
	}
}*/ }



export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		// ✅ Extraer IP real desde Cloudflare
		let ip = req.headers.get('cf-connecting-ip') ||
		         req.headers.get('x-forwarded-for')?.split(',')[0] ||
		         '';

		// Fallback en desarrollo o sin IP
		if (
			process.env.NODE_ENV === 'development' ||
			ip === '::1' ||
			ip === '127.0.0.1' ||
			!ip
		) {
			ip = '190.191.228.34'; // 🇦🇷 IP argentina para testing
		}

		const geoRes = await fetch(`https://pro.ip-api.com/json/${ip}?fields=61439&key=OE5hxPrfwddjYYP`);
		if (!geoRes.ok) throw new Error('Failed to fetch geo info');

		const geo = await geoRes.json();

		return NextResponse.json({
			ip,
			country: geo.countryCode?.toLowerCase() || '',
			name: geo.country || '',
			headers: {
				via: req.headers.get('via'),
				userAgent: req.headers.get('user-agent'),
				cfIP: req.headers.get('cf-connecting-ip'),
			}
		});
	} catch (error) {
		console.error('❌ /api/get-country error:', error);
		return NextResponse.json(
			{ ip: '', country: '', name: '', blocked: true },
			{ status: 500 }
		);
	}
}

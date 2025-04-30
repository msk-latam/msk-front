import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();
    const ip = ipData.ip;
    console.log(ip)
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();

    return NextResponse.json({
      ip,
      country: geo.country?.toLowerCase() || '',
      name: geo.country_name || '',
    });
  } catch (error) {
    console.error('❌ Error en API /get-country:', error);
    return NextResponse.json({ ip: '', country: '', name: '' }, { status: 500 });
  }
}
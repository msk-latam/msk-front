export async function getCountryFromIp() {
	try {
		const res = await fetch('https://ipapi.co/json/'); // 👈 API pública que detecta IP real
		if (!res.ok) throw new Error('IP geolocation failed');
		const data = await res.json(); // { country: 'CO', ... }

		return {
			ip: data.ip,
			country: data.country?.toLowerCase(), // ejemplo: 'co'
			name: data.country_name,
			blocked: false,
		};
	} catch (error) {
		console.error('❌ getCountryFromIp error:', error);
		return { ip: '', country: '', name: '', blocked: true };
	}
}

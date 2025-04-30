export async function getCountryFromIp() {
	try {
		const res = await fetch('/api/get-country');
		const data = await res.json();

		if (data.blocked) {
			console.warn('🌍 Usuario de país bloqueado:', data.country);
			// Podés redirigir o mostrar contenido específico
			window.location.href = '/intl'; // o mostrar un banner especial
		}

		return data;
	} catch (error) {
		console.error('❌ getCountryFromIp error:', error);
		return { ip: '', country: '', name: '', blocked: true };
	}
}
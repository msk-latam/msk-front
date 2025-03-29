import type { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	try {
		const body = req.body; // Convertir el cuerpo de la solicitud a JSON
		// console.log(body)
		const response = await fetch('https://dev.msklatam.tech/msk-laravel/public/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Origin: 'https://msklatam.tech',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return new Response(data, { status: 200 });
	} catch (error: any) {
		return new Response(error, { status: 500 });
	}
}

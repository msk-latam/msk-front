import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { country: string } }) {
	const { country } = params;

	// Determina el archivo JSON basado en el país
	const validCountries = ['ar', 'cl']; // Países válidos
	const fileName = validCountries.includes(country) ? `${country}.json` : 'int.json';

	// Construye la ruta al archivo
	const filePath = path.join(process.cwd(), 'app/products', fileName);

	try {
		// Lee el contenido del archivo JSON
		const fileContents = await fs.readFile(filePath, 'utf-8');
		const data = JSON.parse(fileContents);

		return NextResponse.json(data); // Devuelve los datos como JSON
	} catch (error) {
		console.error('Error al cargar el archivo JSON:', error);
		return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
	}
}

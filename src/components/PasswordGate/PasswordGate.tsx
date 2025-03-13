'use client';

import { useState, useEffect } from 'react';

const PASSWORD = 'msktech'; // Cambia la contraseña según necesidad
const TTL = 60 * 60 * 1000; // 1 hora en milisegundos

const PasswordGate = ({ children }: { children: React.ReactNode }) => {
	const [isAuthorized, setIsAuthorized] = useState(true);
	const [password, setPassword] = useState('');
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		const hostname = window.location.hostname;
		const isTechOrLocalhost = false;
		// const isTechOrLocalhost = hostname.includes('tech');

		// Si no es `.tech` ni `localhost`, permitir acceso directo
		if (!isTechOrLocalhost) {
			setIsAuthorized(true);
			setIsChecking(false);
			return;
		}

		// Verificar autorización previa y tiempo de expiración
		const storedAuth = sessionStorage.getItem('msk_auth');
		const storedTimestamp = sessionStorage.getItem('msk_auth_time');

		if (storedAuth === 'true' && storedTimestamp) {
			const elapsedTime = Date.now() - parseInt(storedTimestamp, 10);

			if (elapsedTime < TTL) {
				setIsAuthorized(true);
			} else {
				// Si ya pasó el TTL, limpiar sesión
				sessionStorage.removeItem('msk_auth');
				sessionStorage.removeItem('msk_auth_time');
			}
		}

		setIsChecking(false);
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password === PASSWORD) {
			sessionStorage.setItem('msk_auth', 'true');
			sessionStorage.setItem('msk_auth_time', Date.now().toString()); // Guardar timestamp
			setIsAuthorized(true);
		} else {
			alert('Contraseña incorrecta');
		}
	};

	// Mientras verifica el dominio, evitar parpadeos
	if (isChecking) return null;

	// Si está autorizado, mostrar el contenido
	if (isAuthorized) return <>{children}</>;

	// Mostrar pantalla de contraseña si no está autorizado
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg text-center'>
				<h2 className='text-xl font-bold mb-4'>Acceso restringido</h2>
				<p className='text-gray-600 mb-4'>Ingresa la contraseña para continuar</p>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Contraseña'
						className='border p-2 rounded w-full'
					/>
					<button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded w-full'>
						Ingresar
					</button>
				</form>
			</div>
		</div>
	);
};

export default PasswordGate;

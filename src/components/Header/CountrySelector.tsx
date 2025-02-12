import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FlagIcon } from 'react-flag-kit';

const countries = [
	{ code: 'ar', name: 'Argentina', flag: '🇦🇷' },
	{ code: 'bo', name: 'Bolivia', flag: '🇧🇴' },
	{ code: 'cl', name: 'Chile', flag: '🇨🇱' },
	{ code: 'co', name: 'Colombia', flag: '🇨🇴' },
	{ code: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
	{ code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
	{ code: 'es', name: 'España', flag: '🇪🇸' },
	{ code: 'gt', name: 'Guatemala', flag: '🇬🇹' },
	{ code: 'hn', name: 'Honduras', flag: '🇭🇳' },
	{ code: 'mx', name: 'México', flag: '🇲🇽' },
	{ code: 'ni', name: 'Nicaragua', flag: '🇳🇮' },
	{ code: 'pa', name: 'Panamá', flag: '🇵🇦' },
	{ code: 'pe', name: 'Perú', flag: '🇵🇪' },
	{ code: 'py', name: 'Paraguay', flag: '🇵🇾' },
	{ code: 'sv', name: 'El Salvador', flag: '🇸🇻' },
	{ code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
	{ code: 've', name: 'Venezuela', flag: '🇻🇪' },
];

export default function CountrySelector({ country }: any) {
	const [selected, setSelected] = useState(countries.find((c) => c.code === country) || countries[0]);
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const [prevPath, setPrevPath] = useState(pathname);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (country) {
			const matchedCountry = countries.find((c) => c.code === country);
			if (matchedCountry) {
				setSelected(matchedCountry);
			}
		}
	}, [country]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// useEffect(() => {
	// 	if (prevPath !== pathname) {
	// 		console.log(pathname);
	// 		console.log(prevPath);
	// 		if (pathname !== '/mi-perfil/') {
	// 			window.location.reload();
	// 		}
	// 		setPrevPath(pathname); // Actualiza el path anterior para evitar recargas infinitas
	// 	}
	// }, [pathname, prevPath]);

	useEffect(() => {
		// Extraemos el primer segmento de la URL como "país" (si está presente y tiene 2 letras)
		const currentCountry = pathname.split('/')[1];
		const prevCountry = prevPath.split('/')[1];

		// Validamos si el segmento es un código de país válido (2 letras)
		const isValidCountry = (country: string) => /^[a-zA-Z]{2}$/.test(country);

		if (prevPath !== pathname) {
			// console.log(`Ruta actual: ${pathname}`);
			// console.log(`Ruta anterior: ${prevPath}`);

			// Si el primer segmento de la URL es un código de país válido y ha cambiado
			if (
				(isValidCountry(currentCountry) && currentCountry !== prevCountry) ||
				(isValidCountry(prevCountry) && !isValidCountry(currentCountry))
			) {
				// console.log(`🔄 El país cambió o desapareció, recargando la página`);
				window.location.reload();
			}

			setPrevPath(pathname); // Actualiza el path anterior para evitar recargas infinitas
		}
	}, [pathname, prevPath]);

	const handleCountryChange = (newCountry: { code: string; name: string; flag: string }) => {
		const currentPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/'); // Elimina el código de país si existe
		const newPath = newCountry.code === '' ? currentPath : `/${newCountry.code}${currentPath}${window.location.search}`;

		if (pathname !== newPath) {
			router.push(newPath);
		}
	};

	return (
		<div className='relative w-52 mb-8' ref={dropdownRef}>
			<button
				onClick={() => setOpen(!open)}
				className='w-full bg-[#1A1F27]  py-2 rounded-lg flex items-center justify-start gap-2 text-white '
			>
				<span className='flex'>
					<FlagIcon code={selected.code.toLocaleUpperCase()} />
				</span>
				{selected.name}
			</button>

			{open && (
				<ul className='absolute left-28 bottom-4 w-full bg-[#1A1F27] border rounded-lg shadow-md mt-2 z-10 p-4 max-h-80 overflow-y-auto scrollbar-thumb-[#6474A6] scrollbar-thin scrollbar-track-transparent'>
					{countries.map((country) => (
						<li
							key={country.code}
							onClick={() => {
								setSelected(country);
								setOpen(false);
								handleCountryChange(country);
							}}
							className='p-2 hover:bg-gray-700 flex items-center cursor-pointer rounded-lg text-white'
						>
							<span className='mr-2'>
								<FlagIcon code={country.code.toLocaleUpperCase()} />
							</span>{' '}
							{country.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

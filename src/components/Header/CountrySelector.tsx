import { useState } from 'react';

const countries = [
	{ code: 'ar', name: 'Argentina', flag: '🇦🇷' },
	{ code: 'bo', name: 'Bolivia', flag: '🇧🇴' },
	{ code: 'cl', name: 'Chile', flag: '🇨🇱' },
	{ code: 'co', name: 'Colombia', flag: '🇨🇴' },
	{ code: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
	{ code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
	{ code: 'sv', name: 'El Salvador', flag: '🇸🇻' },
	{ code: 'gt', name: 'Guatemala', flag: '🇬🇹' },
	{ code: 'hn', name: 'Honduras', flag: '🇭🇳' },
	{ code: 'mx', name: 'México', flag: '🇲🇽' },
	{ code: 'ni', name: 'Nicaragua', flag: '🇳🇮' },
	{ code: 'pa', name: 'Panamá', flag: '🇵🇦' },
	{ code: 'py', name: 'Paraguay', flag: '🇵🇾' },
	{ code: 'pe', name: 'Perú', flag: '🇵🇪' },
	{ code: 'es', name: 'España', flag: '🇪🇸' },
	{ code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
	{ code: 've', name: 'Venezuela', flag: '🇻🇪' },
];

export default function CountrySelector() {
	const [selected, setSelected] = useState(countries[0]);
	const [open, setOpen] = useState(false);

	return (
		<div className='relative w-52 ml-6'>
			<button
				onClick={() => setOpen(!open)}
				className='w-full bg-white px-4 py-2 rounded-lg flex items-center justify-between'
			>
				<span>
					{selected.flag} {selected.name}
				</span>
			</button>

			{open && (
				<ul className='absolute left-0 w-full bg-white border rounded-lg shadow-md mt-2 z-10 p-4 max-h-80 overflow-y-auto scrollbar-thumb-[#6474A6] scrollbar-thin scrollbar-track-transparent'>
					{countries.map((country) => (
						<li
							key={country.code}
							onClick={() => {
								setSelected(country);
								setOpen(false);
							}}
							className='p-2 hover:bg-gray-100 flex items-center cursor-pointer rounded-lg'
						>
							<span className='mr-2'>{country.flag}</span> {country.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

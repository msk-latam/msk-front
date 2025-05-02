import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useContext, useEffect, useState } from 'react';
import { CountryContext } from '@/context/country/CountryContext';
import { usePathname } from 'next/navigation';
import { countries } from '@/data/countries';

interface CountrySelectProps {
	onChange: (code: string) => void;
	allCountries?: boolean;
}

export default function CountrySelect({ onChange, allCountries = false }: CountrySelectProps) {
	const { countryState } = useContext(CountryContext);
	const pathname = usePathname();

	const [isMobile, setIsMobile] = useState(false);

	const validCountries = countries.map((c) => c.id);
	const pathSegments = pathname.split('/').filter(Boolean);
	const countryFromUrl = pathSegments[0]?.toLowerCase();
	const defaultCountry = validCountries.includes(countryFromUrl) ? countryFromUrl : countryState?.country || 'ar';

	useEffect(() => {
		// Verificar si el dispositivo es mobile
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();

		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
      .flag-dropdown .arrow {
        display: none !important;
      }
      .custom-flag-dropdown {
        position: relative;
        cursor: pointer;
      }
      .custom-flag-dropdown::after {
        content: '';
        background-image: url('/icons/arrow-custom.svg');
        background-repeat: no-repeat;
        background-size: contain;
        width: 16px;
        height: 16px;
        position: absolute;
        right: -16px;
        top: 50%;
        transform: translateY(-50%);
      }
    `;
		document.head.appendChild(style);
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	return (
		<div className='flex items-center h-full pl-2'>
			<PhoneInput
				country={defaultCountry}
				value={''}
				onChange={(_: string, data: CountryData | {} | null) => {
					if (data && typeof data === 'object' && 'dialCode' in data) {
						onChange(`+${(data as CountryData).dialCode}`);
					}
				}}
				enableSearch={true}
				{...(allCountries
					? {}
					: {
							onlyCountries: [
								'ar',
								'mx',
								'co',
								'cl',
								'pe',
								'br',
								'uy',
								'es',
								'us',
								'gb',
								'de',
								'fr',
								'it',
								'cn',
								'jp',
								'kr',
								'pt',
								'au',
								'ca',
								'ru',
								'in',
								'za',
								'eg',
								'ng',
								'ke',
								'sa',
								'ae',
								'tr',
								'ir',
								'iq',
								'af',
								'pk',
								'bd',
								'id',
								'ph',
								'th',
								'vn',
								'my',
								'sg',
								'nz',
								'no',
								'se',
								'fi',
								'dk',
								'nl',
								'be',
								'ch',
								'at',
								'pl',
								'cz',
								'sk',
								'hu',
								'ro',
								'bg',
								'gr',
								'ua',
								'il',
								'ma',
								'bo',
								'py',
								've',
								'ec',
								'gt',
								'hn',
								'sv',
								'ni',
								'cr',
								'pa',
								'do',
							],
					  })}
				disableCountryCode={true}
				disableDropdown={false}
				countryCodeEditable={false}
				localization={{
					us: 'Estados Unidos',
					gb: 'Reino Unido',
					de: 'Alemania',
					fr: 'Francia',
					es: 'España',
					ar: 'Argentina',
					br: 'Brasil',
					mx: 'México',
					co: 'Colombia',
					cl: 'Chile',
					uy: 'Uruguay',
					pe: 'Perú',
					it: 'Italia',
					cn: 'China',
					jp: 'Japón',
					kr: 'Corea del Sur',
					pt: 'Portugal',
					au: 'Australia',
					ca: 'Canadá',
					ru: 'Rusia',
					in: 'India',
					za: 'Sudáfrica',
					eg: 'Egipto',
					ng: 'Nigeria',
					ke: 'Kenia',
					sa: 'Arabia Saudita',
					ae: 'Emiratos Árabes Unidos',
					tr: 'Turquía',
					ir: 'Irán',
					iq: 'Irak',
					af: 'Afganistán',
					pk: 'Pakistán',
					bd: 'Bangladés',
					id: 'Indonesia',
					ph: 'Filipinas',
					th: 'Tailandia',
					vn: 'Vietnam',
					my: 'Malasia',
					sg: 'Singapur',
					nz: 'Nueva Zelanda',
					no: 'Noruega',
					se: 'Suecia',
					fi: 'Finlandia',
					dk: 'Dinamarca',
					nl: 'Países Bajos',
					be: 'Bélgica',
					ch: 'Suiza',
					at: 'Austria',
					pl: 'Polonia',
					cz: 'Chequia',
					sk: 'Eslovaquia',
					hu: 'Hungría',
					ro: 'Rumanía',
					bg: 'Bulgaria',
					gr: 'Grecia',
					ua: 'Ucrania',
					il: 'Israel',
					ma: 'Marruecos',
					bo: 'Bolivia',
					py: 'Paraguay',
					ve: 'Venezuela',
					ec: 'Ecuador',
					gt: 'Guatemala',
					hn: 'Honduras',
					sv: 'El Salvador',
					ni: 'Nicaragua',
					cr: 'Costa Rica',
					pa: 'Panamá',
					do: 'República Dominicana',
				}}
				inputProps={{
					readOnly: true,
					style: { display: 'none' },
				}}
				inputStyle={{ display: 'none' }}
				buttonClass='custom-flag-dropdown'
				buttonStyle={{
					border: 'none',
					background: 'transparent',
					width: '32px',
					height: '32px',
					padding: '0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
				}}
				containerStyle={{
					width: '100%',
					background: 'transparent',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					border: 'none',
				}}
				dropdownStyle={
					isMobile
						? {
								zIndex: 9999,
								position: 'absolute',
								left: '500%',
								top: '30%',
								transform: 'translateX(-50%)',
								maxHeight: '60vh',
								overflowY: 'auto',
								backgroundColor: 'white',
								boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
								borderRadius: '8px',
								minWidth: '280px',
								overflowX: 'hidden',
						  }
						: {
								zIndex: 9999,
								position: 'absolute',
								left: '40px', // Ajusta este valor según el padding que uses
								top: '40px',
								backgroundColor: 'white',
								boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
								borderRadius: '8px',
								minWidth: '280px',
								maxHeight: '300px',
								overflowY: 'auto',
						  }
				}
			/>
		</div>
	);
}

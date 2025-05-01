import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useContext, useEffect } from 'react';
import { CountryContext } from '@/context/country/CountryContext';
import { usePathname } from 'next/navigation';
import { countries } from '@/data/countries';

interface CountrySelectProps {
  onChange: (code: string) => void;
}

export default function CountrySelect({ onChange }: CountrySelectProps) {
  const { countryState } = useContext(CountryContext);
  const pathname = usePathname();

  const validCountries = countries.map(c => c.id);
  const pathSegments = pathname.split('/').filter(Boolean);
  const countryFromUrl = pathSegments[0]?.toLowerCase();
  const defaultCountry = validCountries.includes(countryFromUrl)
    ? countryFromUrl
    : countryState?.country || 'ar';

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
        value={''} // No input control needed
        onChange={(_: string, data: CountryData | {} | null) => {
          if (data && typeof data === 'object' && 'dialCode' in data) {
            onChange(`+${(data as CountryData).dialCode}`);
          }
        }}
        enableSearch={true}
        onlyCountries={['ar', 'mx', 'co', 'cl', 'pe', 'br', 'uy', 'es']}
        disableCountryCode={true}
        disableDropdown={false}
        countryCodeEditable={false}
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
        dropdownStyle={{ zIndex: 9999 }}
      />
    </div>
  );
}

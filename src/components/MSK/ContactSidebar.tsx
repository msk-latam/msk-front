'use client';
import { CountryContext } from '@/context/country/CountryContext';
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { Mail, Phone } from 'react-feather';

type ContactSidebarProps = {
	variant?: 1 | 2; // 1: solo teléfono, 2: solo email
};

const ContactSidebar: React.FC<ContactSidebarProps> = ({ variant }) => {
	const { countryState } = useContext(CountryContext);
	const [phone, setPhone] = React.useState<string | null>(null);
	const [secondaryPhone, setSecondaryPhone] = React.useState<string | null>(null);
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';
	useEffect(() => {
		if (country) {
			switch (country) {
				case 'ec':
					setPhone('(+593) 2-401-6114');
					setSecondaryPhone(null);
					break;
				case 'mx':
					setPhone('(+52) 55-9058-6200');
					setSecondaryPhone(null);
					break;
				case 'cl':
					setPhone('(+56) 22-487-5300');
					setSecondaryPhone(null);
					break;
				case 'ar':
					setPhone('0800-220-6334');
					setSecondaryPhone('011-5263-0582');
					break;
				default:
					setPhone(null);
					setSecondaryPhone(null);
					break;
			}
		} else {
			setPhone('0800-220-6334');
			setSecondaryPhone('011-5263-0582');
		}
	}, [country]);

	return (
		<div className='sidebar-widget-wrapper'>
			<div className='support-contact mb-30'>
				<div className='flex flex-col gap-4 support-contact-inner'>
					{variant !== 2 && phone && (
						<div className='flex gap-2'>
							<div className='flex flex-col gap-2'>
								<Phone className='text-[#9200AD]' />
								<span className='text-lg font-bold'>Teléfono</span>
								<p>{phone}</p>
								{secondaryPhone && <p>{secondaryPhone}</p>}
							</div>
						</div>
					)}

					{variant !== 1 && (
						<div className='support-item'>
							<div className='support-icon'>
								<img src='/images/icons/email.svg' alt='' width='20' />
							</div>
							<div className='flex flex-col gap-2'>
								<Mail className='text-[#9200AD]' />
								<span className='text-lg font-bold'>E-mail</span>
								<a href='mailto:hola@msklatam.com'>hola@msklatam.com</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactSidebar;

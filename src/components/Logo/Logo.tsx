import React from 'react';
import NcLink from '../NcLink/NcLink';
import NcImage from '../NcImage/NcImage';

export interface LogoProps {
	img?: string;
	imgLight?: string;
	isOnBlog: boolean;
	target?: string;
	country?: string;
}

const Logo: React.FC<LogoProps> = ({
	img = '/images/msk-logo.svg',
	isOnBlog,
	imgLight = '/images/logo-light.png',
	target,
	country,
}) => {
	return (
		<NcLink
			href={
				isOnBlog
					? `${window.location.origin}/${country}/blog/`
					: `${window.location.origin}/${country === undefined ? '' : country}`
			}
			className='ttnc-logo inline-block text-primary-6000 w-[100px] '
			target={target}
		>
			<NcImage src={img} alt='Logo' width='100' height='60' />
		</NcLink>
	);
};

export default Logo;

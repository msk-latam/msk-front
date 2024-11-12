import React from 'react';
import NcLink from '../NcLink/NcLink';
import NcImage from '../NcImage/NcImage';

export interface LogoProps {
	img?: string;
	imgLight?: string;
	isOnBlog: boolean;
	target?: string;
}

const Logo: React.FC<LogoProps> = ({
	img = '/images/msk-logo.svg',
	isOnBlog,
	imgLight = '/images/logo-light.png',
	target,
}) => {
	return (
		<NcLink href={isOnBlog ? '/blog' : '/'} className='ttnc-logo inline-block text-primary-6000 w-[100px] ' target={target}>
			<NcImage src={img} alt='Logo' width='100' height='60' />
		</NcLink>
	);
};

export default Logo;

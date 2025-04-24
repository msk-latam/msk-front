'use client';

import { IconName, icons } from './index';
import { IconProps } from './types';

interface Props extends IconProps {
	name: IconName;
}

export default function Icon({ name, className }: Props) {
	const IconComponent = icons[name];

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found.`);
		return null;
	}

	return <IconComponent className={className} />;
}

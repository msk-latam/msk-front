import { IconProps } from './types';

const ArrowRightIcon = ({ className = '' }: IconProps) => (
	<svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}>
		<path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
	</svg>
);

export default ArrowRightIcon;

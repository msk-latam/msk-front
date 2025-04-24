import { IconProps } from './types';

const ArrowLeftIcon = ({ className = '' }: IconProps) => (
	<svg className={className} width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5}>
		<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
	</svg>
);

export default ArrowLeftIcon;

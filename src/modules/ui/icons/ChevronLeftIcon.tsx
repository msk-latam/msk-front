import { IconProps } from './types';

const ChevronLeftIcon = ({ className = '' }: IconProps) => (
	<svg className={className} width='9' height='14' viewBox='0 0 9 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M7.57227 13L1.57227 7L7.57227 1'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default ChevronLeftIcon;

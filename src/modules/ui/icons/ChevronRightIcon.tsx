import { IconProps } from './types';

const ChevronRightIcon = ({ className = '' }: IconProps) => (
	<svg className={className} viewBox='0 0 9 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M1.57227 13L7.57227 7L1.57227 1'
			stroke='currentColor'
			strokeWidth='1.25'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default ChevronRightIcon;

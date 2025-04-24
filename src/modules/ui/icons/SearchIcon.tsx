import { IconProps } from './types';

const SearchIcon = ({ className = '' }: IconProps) => (
	<svg className={className} viewBox='0 0 17 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M16.0723 16.5L12.4473 12.875M14.4056 8.16667C14.4056 11.8486 11.4208 14.8333 7.73893 14.8333C4.05703 14.8333 1.07227 11.8486 1.07227 8.16667C1.07227 4.48477 4.05703 1.5 7.73893 1.5C11.4208 1.5 14.4056 4.48477 14.4056 8.16667Z'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default SearchIcon;

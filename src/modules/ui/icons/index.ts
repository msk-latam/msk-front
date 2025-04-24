import ArrowLeftIcon from './ArrowLeftIcon';
import ArrowRightIcon from './ArrowRightIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import DocumentIcon from './DocumentIcon';
import HomeIcon from './HomeIcon';
import HourGlassIcon from './HourGlassIcon';
import SearchIcon from './SearchIcon';

export const icons = {
	'chevron-left': ChevronLeftIcon,
	'chevron-right': ChevronRightIcon,
	document: DocumentIcon,
	'arrow-right': ArrowRightIcon,
	'arrow-left': ArrowLeftIcon,
	search: SearchIcon,
	home: HomeIcon,
	hourglass: HourGlassIcon,
	// agregá más íconos aquí
};

export type IconName = keyof typeof icons;

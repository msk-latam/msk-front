import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { useDebounce } from '@/modules/components/navbar/hooks/useDebounce';
import React, { FC, useEffect, useState } from 'react';

interface SearchBarProps {
	onSearch?: (selectedOption: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
	const { addFilter, removeFilter } = useStoreFilters();

	// Local state for the raw value coming from the input
	const [term, setTerm] = useState('');

	// Debounce the raw term so we only fire the heavy logic once the user pauses typing
	const debouncedTerm = useDebounce(term, 300);

	// Sync the debounced term with the store filters and the optional callback
	useEffect(() => {
		const trimmed = debouncedTerm.trim();

		if (trimmed) {
			addFilter('search', trimmed);
		} else {
			removeFilter('search', '');
		}

		if (typeof onSearch === 'function') {
			onSearch(trimmed);
		}
	}, [debouncedTerm, addFilter, removeFilter, onSearch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(event.target.value);
	};

	return (
		<div className='corse-bar-wrapper grid-area-search'>
			<div className='bar-search '>
				<form action='#'>
					<div className='bar-search-icon'>
						<i className='flaticon-search'></i>
						<input id='store-search' type='text' placeholder='Buscar' value={term} onChange={handleChange} />
						<button type='submit'>
							<i className='far fa-search'></i>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SearchBar;

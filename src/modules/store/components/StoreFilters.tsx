import Accordion from '@/store/components/ui/Accordion'; // Assuming correct path alias
import Checkbox from '@/store/components/ui/Checkbox'; // Assuming correct path alias
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

// Mock Data
const especialidadesData = [
	'Administración y gestión',
	'Anestesiología y dolor',
	'Cardiología',
	'Dermatología',
	'Diabetes',
	'Emergentología',
	'Endocrinología',
	'Gastroenterología',
	'Geriatría',
	'Ginecología',
	'Hematología',
	'Infectología',
	'Medicina familiar',
	'Medicina general',
	'Medicina intensiva',
	'Medicina laboral',
	'Nefrología',
	'Nutrición',
	'Oftalmología',
	'Oncología',
	'Pediatría',
	'Psiquiatría',
	'Radiología e imagenología',
	'Traumatología',
	'Urología',
];

const recursoData = ['Curso', 'Guías profesionales'];

const profesionData = ['Personal médico', 'Personal de enfermería y auxiliares', 'Otra porfesión'];

const duracionData = ['Hasta 300 horas', 'De 100 a 300 horas', 'Más de 300 horas'];

interface FilterSectionProps {
	title: string;
	options: string[];
	openIndices: Set<number>;
	sectionIndex: number;
	onToggle: (index: number) => void;
	selectedOptions: Set<string>;
	onOptionChange: (option: string) => void;
	className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
	title,
	options,
	openIndices,
	sectionIndex,
	onToggle,
	selectedOptions,
	onOptionChange,
	className,
}) => {
	const isOpen = openIndices.has(sectionIndex);

	// Determine the appropriate classes for checked items based on the image
	const getCheckboxWrapperClass = (option: string) => {
		if (selectedOptions.has(option)) {
			// Mimic the purple border and light background
			return 'bg-[#F7F9FF] rounded-full p-3 -ml-2 pr-3'; // Adjust padding as needed
		}
		return 'p-3 -ml-2 pr-3 rounded-full '; // Default padding/margin adjustments
	};

	return (
		<div className={`mb-4 bg-white rounded-[30px] p-[36px] ${className}`}>
			<Accordion
				title={title}
				isOpen={isOpen}
				onToggle={() => onToggle(sectionIndex)}
				forModules={false} // Use the simpler title style
			>
				<div className='space-y-2'>
					{options.map((option) => (
						<div key={option} className={`${getCheckboxWrapperClass(option)}`}>
							<Checkbox
								key={option}
								label={option}
								name={`${title}-${option}`.replace(/\s+/g, '-')}
								checked={selectedOptions.has(option)}
								onChange={() => onOptionChange(option)}
							/>
						</div>
					))}
				</div>
			</Accordion>
		</div>
	);
};

const StoreFilters = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Initialize the Set with all section indices (0, 1, 2, 3)
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1, 2, 3]));

	const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({
		especialidades: new Set(),
		recurso: new Set(),
		profesion: new Set(),
		duracion: new Set(),
	});

	// Effect to initialize filters from URL on mount and when searchParams change
	useEffect(() => {
		const initialFilters: Record<string, Set<string>> = {
			especialidades: new Set(),
			recurso: new Set(),
			profesion: new Set(),
			duracion: new Set(),
		};

		searchParams.forEach((value, key) => {
			if (key in initialFilters) {
				const items = value.split(',');
				initialFilters[key] = new Set(items.map((item: string) => item.replace(/-/g, ' '))); // Convert back from URL format
			}
		});

		// Check if the initialized filters differ from the current state to avoid loops
		let needsUpdate = false;
		for (const key in initialFilters) {
			if (
				initialFilters[key].size !== selectedFilters[key].size ||
				!Array.from(initialFilters[key]).every((val) => selectedFilters[key].has(val))
			) {
				needsUpdate = true;
				break;
			}
		}

		if (needsUpdate) {
			setSelectedFilters(initialFilters);
		}
	}, [searchParams]); // Depend on searchParams

	// Toggle function adds or removes the index from the Set
	const handleToggleAccordion = (index: number) => {
		setOpenIndices((prevIndices) => {
			const newIndices = new Set(prevIndices);
			if (newIndices.has(index)) {
				newIndices.delete(index);
			} else {
				newIndices.add(index);
			}
			return newIndices;
		});
	};

	// Memoized function to create the query string
	const createQueryString = useCallback(
		(params: Record<string, string>) => {
			const newSearchParams = new URLSearchParams(searchParams.toString());

			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newSearchParams.set(key, value);
				} else {
					newSearchParams.delete(key); // Remove the key if the value is empty/null
				}
			});

			return newSearchParams.toString();
		},
		[searchParams],
	);

	const handleOptionChange = (section: string, option: string) => {
		// Calculate the next state first
		const nextFilters = { ...selectedFilters };
		const newSectionOptions = new Set(nextFilters[section]);

		if (newSectionOptions.has(option)) {
			newSectionOptions.delete(option);
		} else {
			newSectionOptions.add(option);
		}
		nextFilters[section] = newSectionOptions;

		// Update the state
		setSelectedFilters(nextFilters);

		// Update the URL
		const queryParams: Record<string, string> = {};
		Object.entries(nextFilters).forEach(([key, valueSet]) => {
			const valueString = Array.from(valueSet)
				.map((val) => val.replace(/\s+/g, '-'))
				.join(',');
			queryParams[key] = valueString; // Assign even if empty to ensure removal via createQueryString
		});

		// Use router.push with the pathname and the new query string
		router.push(pathname + '?' + createQueryString(queryParams));

		// Add logic here to actually filter the store items based on selectedFilters
		console.log('Selected Filters:', nextFilters);
	};

	return (
		<div className='md:col-span-1 md:row-span-3 order-1 md:order-1'>
			<FilterSection
				title='Especialidades'
				options={especialidadesData}
				openIndices={openIndices}
				sectionIndex={0}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.especialidades}
				onOptionChange={(option) => handleOptionChange('especialidades', option)}
			/>
			<FilterSection
				title='Recurso'
				options={recursoData}
				openIndices={openIndices}
				sectionIndex={1}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.recurso}
				onOptionChange={(option) => handleOptionChange('recurso', option)}
			/>
			<FilterSection
				title='Profesión'
				options={profesionData}
				openIndices={openIndices}
				sectionIndex={2}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.profesion}
				onOptionChange={(option) => handleOptionChange('profesion', option)}
			/>
			<FilterSection
				title='Duración'
				options={duracionData}
				openIndices={openIndices}
				sectionIndex={3}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.duracion}
				onOptionChange={(option) => handleOptionChange('duracion', option)}
			/>
		</div>
	);
};

export default StoreFilters;

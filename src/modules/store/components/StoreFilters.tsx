import Modal from '@/modules/dashboard/components/ui/Modal'; // Import Modal component
import Accordion from '@/store/components/ui/Accordion'; // Assuming correct path alias
import Checkbox from '@/store/components/ui/Checkbox'; // Assuming correct path alias
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

// Mock Data with value and label
interface FilterOption {
	value: string;
	label: string;
}

const especialidadesData: FilterOption[] = [
	{ value: 'administracion-y-gestion', label: 'Administración y gestión' },
	{ value: 'anestesiologia-y-dolor', label: 'Anestesiología y dolor' },
	{ value: 'cardiologia', label: 'Cardiología' },
	{ value: 'dermatologia', label: 'Dermatología' },
	{ value: 'diabetes', label: 'Diabetes' },
	{ value: 'emergentologia', label: 'Emergentología' },
	{ value: 'endocrinologia', label: 'Endocrinología' },
	{ value: 'gastroenterologia', label: 'Gastroenterología' },
	{ value: 'geriatria', label: 'Geriatría' },
	{ value: 'ginecologia', label: 'Ginecología' },
	{ value: 'hematologia', label: 'Hematología' },
	{ value: 'infectologia', label: 'Infectología' },
	{ value: 'medicina-familiar', label: 'Medicina familiar' },
	{ value: 'medicina-general', label: 'Medicina general' },
	{ value: 'medicina-intensiva', label: 'Medicina intensiva' },
	{ value: 'medicina-laboral', label: 'Medicina laboral' },
	{ value: 'nefrologia', label: 'Nefrología' },
	{ value: 'nutricion', label: 'Nutrición' },
	{ value: 'oftalmologia', label: 'Oftalmología' },
	{ value: 'oncologia', label: 'Oncología' },
	{ value: 'pediatria', label: 'Pediatría' },
	{ value: 'psiquiatria', label: 'Psiquiatría' },
	{ value: 'radiologia-e-imagenologia', label: 'Radiología e imagenología' },
	{ value: 'traumatologia', label: 'Traumatología' },
	{ value: 'urologia', label: 'Urología' },
];

const recursoData: FilterOption[] = [
	{ value: 'curso', label: 'Curso' },
	{ value: 'guias-profesionales', label: 'Guías profesionales' },
];

const profesionData: FilterOption[] = [
	{ value: 'medicos', label: 'Personal médico' },
	{ value: 'enfermeros-auxiliares', label: 'Personal de enfermería y auxiliares' },
	{ value: 'otra-profesion', label: 'Otra porfesión' },
];

const duracionData: FilterOption[] = [
	{ value: 'hasta-300', label: 'Hasta 300 horas' },
	{ value: '100-300', label: 'De 100 a 300 horas' },
	{ value: 'mas-300', label: 'Más de 300 horas' },
];

interface FilterSectionProps {
	title: string;
	options: FilterOption[]; // Changed from string[]
	openIndices: Set<number>;
	sectionIndex: number;
	onToggle: (index: number) => void;
	selectedOptions: Set<string>; // Remains Set<string> to hold selected values
	onOptionChange: (value: string) => void; // Changed parameter name for clarity
	className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
	title,
	options,
	openIndices,
	sectionIndex,
	onToggle,
	selectedOptions,
	onOptionChange, // This now expects the value
	className,
}) => {
	const isOpen = openIndices.has(sectionIndex);

	// Determine the appropriate classes for checked items based on the image
	const getCheckboxWrapperClass = (value: string) => {
		// Check if the value is selected
		if (selectedOptions.has(value)) {
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
						// Use option.value for key and class checking
						<div key={option.value} className={`${getCheckboxWrapperClass(option.value)}`}>
							<Checkbox
								key={option.value} // Use value for key
								label={option.label} // Use label for display
								name={`${title}-${option.value}`} // Use value in name
								checked={selectedOptions.has(option.value)} // Check based on value
								onChange={() => onOptionChange(option.value)} // Pass value on change
							/>
						</div>
					))}
				</div>
			</Accordion>
		</div>
	);
};

const StoreFilters = ({ isMobile = false, isModalOpen = false, onModalClose = () => {} }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams() || new URLSearchParams();

	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1, 2, 3]));

	// selectedFilters still holds Sets of string values
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

		if (searchParams) {
			searchParams.forEach((value, key) => {
				if (key in initialFilters) {
					const items = value.split(',');
					// Values from URL are already in the correct format (e.g., 'administracion-y-gestion')
					initialFilters[key] = new Set(items);
				}
			});
		}

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
		// Removed selectedFilters from dependency array as it caused potential loops
		// The comparison logic should prevent unnecessary updates.
	}, [searchParams]);

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

	const createQueryString = useCallback(
		(params: Record<string, string>) => {
			const newSearchParams = new URLSearchParams(searchParams ? searchParams.toString() : '');

			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					newSearchParams.set(key, value);
				} else {
					newSearchParams.delete(key);
				}
			});

			return newSearchParams.toString();
		},
		[searchParams],
	);

	// handleOptionChange now receives the 'value' string
	const handleOptionChange = (section: string, value: string) => {
		const nextFilters = { ...selectedFilters };
		const newSectionOptions = new Set(nextFilters[section]);

		if (newSectionOptions.has(value)) {
			newSectionOptions.delete(value);
		} else {
			newSectionOptions.add(value);
		}
		nextFilters[section] = newSectionOptions;

		setSelectedFilters(nextFilters);

		const queryParams: Record<string, string> = {};
		Object.entries(nextFilters).forEach(([key, valueSet]) => {
			// Join the values directly, they are already in the desired format
			const valueString = Array.from(valueSet).join(',');
			queryParams[key] = valueString;
		});

		// Add { scroll: false } to prevent scroll on navigation
		router.push(pathname + '?' + createQueryString(queryParams), { scroll: false });

		console.log('Selected Filter Values:', nextFilters);
	};

	const filtersContent = (
		<>
			<FilterSection
				title='Especialidades'
				options={especialidadesData} // Pass the new data structure
				openIndices={openIndices}
				sectionIndex={0}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.especialidades} // Pass the Set of selected values
				onOptionChange={(value) => handleOptionChange('especialidades', value)} // Pass the value
			/>
			<FilterSection
				title='Recurso'
				options={recursoData} // Pass the new data structure
				openIndices={openIndices}
				sectionIndex={1}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.recurso} // Pass the Set of selected values
				onOptionChange={(value) => handleOptionChange('recurso', value)} // Pass the value
			/>
			<FilterSection
				title='Profesión'
				options={profesionData} // Pass the new data structure
				openIndices={openIndices}
				sectionIndex={2}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.profesion} // Pass the Set of selected values
				onOptionChange={(value) => handleOptionChange('profesion', value)} // Pass the value
			/>
			<FilterSection
				title='Duración'
				options={duracionData} // Pass the new data structure
				openIndices={openIndices}
				sectionIndex={3}
				onToggle={handleToggleAccordion}
				selectedOptions={selectedFilters.duracion} // Pass the Set of selected values
				onOptionChange={(value) => handleOptionChange('duracion', value)} // Pass the value
			/>
		</>
	);

	// For mobile view, render as Modal component
	if (isMobile) {
		return (
			<Modal isOpen={isModalOpen} onClose={onModalClose} title='Filtros' size='large'>
				<div className='px-2'>{filtersContent}</div>
			</Modal>
		);
	}

	// For desktop view, render normally
	return <div className='md:col-span-1 md:row-span-3 order-1 md:order-1'>{filtersContent}</div>;
};

export default StoreFilters;

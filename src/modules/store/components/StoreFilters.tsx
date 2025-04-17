import Accordion from '@/store/components/ui/Accordion'; // Assuming correct path alias
import Checkbox from '@/store/components/ui/Checkbox'; // Assuming correct path alias
import React, { useState } from 'react';

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

interface StoreFiltersProps {
	// Make the callback prop optional with a default value
	onFilterCountChange?: (count: number) => void;
}

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

const StoreFilters: React.FC<StoreFiltersProps> = ({
	// Provide a default empty function if prop is not passed
	onFilterCountChange = () => {},
}) => {
	const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1, 2, 3]));
	const [selectedFilters, setSelectedFilters] = useState<Record<string, Set<string>>>({
		especialidades: new Set(),
		recurso: new Set(),
		profesion: new Set(),
		duracion: new Set(),
	});

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

	const handleOptionChange = (section: string, option: string) => {
		setSelectedFilters((prev) => {
			const newState = { ...prev };
			const newSectionOptions = new Set(newState[section]);
			if (newSectionOptions.has(option)) {
				newSectionOptions.delete(option);
			} else {
				newSectionOptions.add(option);
			}
			newState[section] = newSectionOptions;

			// Calculate total count after state updates
			let totalCount = 0;
			Object.values(newState).forEach((set) => {
				totalCount += set.size;
			});

			// Call the callback with the new count
			onFilterCountChange(totalCount);

			return newState;
		});
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

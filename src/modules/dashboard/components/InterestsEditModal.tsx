import Modal from '@/modules/dashboard/components/ui/Modal';
import React, { useEffect, useState } from 'react';

// Define the structure for available interests (can be fetched later)
interface InterestCategory {
	title: string;
	options: string[];
	multiSelect: boolean; // True for tags, false for checkboxes (if needed, but looks like multi-select everywhere)
}

const interestData: InterestCategory[] = [
	{
		title: 'Especialidades',
		multiSelect: true,
		options: [
			'Administración y gestión',
			'Anestesiología y dolor',
			'Cardiología',
			'Cirugía',
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
			'Nefrología',
			'Nutrición',
			'Obstetricia',
			'Oftalmología',
			'Oncología',
			'Pediatría',
			'Psiquiatría',
			'Radiología e imagenología',
			'Traumatología',
			'Urología',
		],
	},
	{
		title: 'Contenido',
		multiSelect: true,
		options: ['Cursos', 'Guías profesionales', 'Artículos de blog', 'Infografías', 'Videografías', 'Tutoriales', 'Webinars'],
	},
	{
		title: '¿Qué te trae a MSK hoy?',
		multiSelect: true,
		options: [
			'Especializarme en un área médica específica',
			'Obtener certificaciones o puntaje de recertificación',
			'Actualizarme con las últimas tendencias en salud',
			'Aprender sobre innovación y tecnología en el sector salud',
			'Mejorar mis habilidades prácticas en atención',
			'Otro motivo',
			'Prepararme para exámenes de residencia u otros',
		],
	},
];

interface InterestsEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedInterests: string[]) => void;
	initialInterests: string[];
}

const InterestsEditModal: React.FC<InterestsEditModalProps> = ({ isOpen, onClose, onSave, initialInterests }) => {
	const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

	useEffect(() => {
		if (isOpen && initialInterests) {
			setSelectedInterests(new Set(initialInterests));
		} else if (!isOpen) {
			setSelectedInterests(new Set()); // Reset on close
		}
	}, [isOpen, initialInterests]);

	const handleToggleInterest = (interest: string) => {
		setSelectedInterests((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(interest)) {
				newSet.delete(interest);
			} else {
				newSet.add(interest);
			}
			return newSet;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(Array.from(selectedInterests));
		onClose();
	};

	if (!isOpen) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Cuéntanos tus intereses' size='large'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				{interestData.map((category) => (
					<div key={category.title}>
						<h3 className='text-lg font-medium text-center mb-3 text-[#1A1A1A]'>{category.title}</h3>
						{/* Use grid layout for the checkbox section */}
						<div
							className={`w-full gap-2 ml-1 ${
								category.title === '¿Qué te trae a MSK hoy?'
									? 'grid grid-cols-1 md:grid-cols-2'
									: 'flex flex-wrap items-center justify-center'
							}`}
						>
							{category.options.map((option) => {
								const isSelected = selectedInterests.has(option);
								const selectedClasses = 'bg-[#DFE6FF] text-[#29324F] font-semibold';
								const unselectedClasses = 'bg-[#F7F9FF] text-[#29324F] hover:[#DFE6FF]';

								if (category.title === '¿Qué te trae a MSK hoy?') {
									// Checkbox style
									const checkboxSelectedClasses =
										'border-[#9200AD] bg-[#F7F3FF] outline outline-2 outline-offset-[-1px] outline-[#9200AD]';
									const checkboxUnselectedClasses = 'border-gray-300 bg-white';
									// Remove width calculation, grid handles it.
									const checkboxCommonClasses =
										'flex items-center p-3 rounded-[14px] border cursor-pointer w-full transition-colors';
									return (
										<label
											key={option}
											className={`${checkboxCommonClasses} ${
												isSelected ? checkboxSelectedClasses : checkboxUnselectedClasses
											}`}
										>
											{/* Hidden actual checkbox */}
											<input
												type='checkbox'
												checked={isSelected}
												onChange={() => handleToggleInterest(option)}
												className='sr-only'
											/>
											{/* Custom Checkbox Visual */}
											<div
												className={`w-5 h-5 border-2 rounded-md flex-shrink-0 mr-3 flex items-center justify-center transition-colors ${
													isSelected ? 'border-[#9200AD] bg-[#F7F3FF]' : 'border-gray-400 bg-white'
												}`}
											>
												{isSelected && (
													<svg width='12' height='9' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
														<path
															d='M10.6668 1.5L4.25016 7.91667L1.3335 5'
															stroke='#9200AD'
															strokeWidth='2'
															strokeLinecap='round'
															strokeLinejoin='round'
														/>
													</svg>
												)}
											</div>
											<span className={`text-sm ${isSelected ? 'text-[#1A1A1A] font-medium' : 'text-[#4F5D89]'}`}>
												{option}
											</span>
										</label>
									);
								} else {
									// Tag/Pill style
									const tagCommonClasses =
										'px-4 py-2 rounded-full text-sm font-inter font-normal cursor-pointer transition-colors';
									return (
										<button
											type='button'
											key={option}
											onClick={() => handleToggleInterest(option)}
											className={`${tagCommonClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
										>
											{option}
										</button>
									);
								}
							})}
						</div>
					</div>
				))}

				<div className='flex justify-center pt-6 mt-6'>
					<button
						type='submit'
						className='px-8 py-3 bg-[#9200AD] text-white font-medium rounded-full hover:bg-[#7a0092] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9200AD]'
					>
						Guardar cambios
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default InterestsEditModal;

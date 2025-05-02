import Modal from '@/modules/dashboard/components/ui/Modal';
import React, { useEffect, useState } from 'react';

// Define the structure for available interests (can be fetched later)
interface InterestCategory {
	title: string;
	options: string[];
	multiSelect: boolean; // True for tags, false for checkboxes (if needed, but looks like multi-select everywhere)
}

interface InterestPayload {
	specialty_interests: string[];
	content_interests: string[];
	other_interests: string[];
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
	onSave: (payload: InterestPayload) => Promise<void>;
	initialData: Partial<InterestPayload>;
	isSaving: boolean;
	saveError: string | null;
	saveSuccess: boolean;
}

const InterestsEditModal: React.FC<InterestsEditModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialData,
	isSaving,
	saveError,
	saveSuccess,
}) => {
	// Separate state for each category
	const [selectedEspecialidades, setSelectedEspecialidades] = useState<Set<string>>(new Set());
	const [selectedContenido, setSelectedContenido] = useState<Set<string>>(new Set());
	const [selectedAdicionales, setSelectedAdicionales] = useState<Set<string>>(new Set());

	// Extract options for easier filtering during initialization
	const especialidadOptions = interestData.find((cat) => cat.title === 'Especialidades')?.options || [];
	const contenidoOptions = interestData.find((cat) => cat.title === 'Contenido')?.options || [];
	const adicionalesOptions = interestData.find((cat) => cat.title === '¿Qué te trae a MSK hoy?')?.options || [];

	useEffect(() => {
		if (isOpen && initialData) {
			// Initialize based on provided initialData, filtering ensures only valid options are set
			setSelectedEspecialidades(
				new Set((initialData.specialty_interests || []).filter((opt) => especialidadOptions.includes(opt))),
			);
			setSelectedContenido(new Set((initialData.content_interests || []).filter((opt) => contenidoOptions.includes(opt))));
			setSelectedAdicionales(new Set((initialData.other_interests || []).filter((opt) => adicionalesOptions.includes(opt))));
		} else if (!isOpen) {
			// Reset on close
			setSelectedEspecialidades(new Set());
			setSelectedContenido(new Set());
			setSelectedAdicionales(new Set());
		}
	}, [isOpen, initialData, especialidadOptions, contenidoOptions, adicionalesOptions]);

	const handleToggleInterest = (interest: string, categoryTitle: string) => {
		let setState: React.Dispatch<React.SetStateAction<Set<string>>>;

		// Determine which state setter to use
		if (categoryTitle === 'Especialidades') {
			setState = setSelectedEspecialidades;
		} else if (categoryTitle === 'Contenido') {
			setState = setSelectedContenido;
		} else {
			// Assumes '¿Qué te trae a MSK hoy?'
			setState = setSelectedAdicionales;
		}

		setState((prev) => {
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
		const payload: InterestPayload = {
			specialty_interests: Array.from(selectedEspecialidades),
			content_interests: Array.from(selectedContenido),
			other_interests: Array.from(selectedAdicionales),
		};
		onSave(payload);
	};

	if (!isOpen) return null;

	// --- Button State Logic (similar to ProfileEditModal) ---
	let buttonContent: React.ReactNode = 'Guardar cambios';
	let buttonDisabled = isSaving || saveSuccess;
	let buttonClasses =
		'px-8 py-3 bg-[#9200AD] text-white font-medium rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center'; // Added flex centering

	if (isSaving) {
		buttonContent = (
			<>
				{/* Add spinner if desired */}
				<span className='ml-2'>Guardando...</span>
			</>
		);
		buttonClasses += ' bg-[#a9a9a9] cursor-not-allowed';
	} else if (saveSuccess) {
		buttonContent = 'Intereses guardados';
		buttonClasses += ' bg-green-500 cursor-not-allowed';
	} else if (saveError) {
		// Keep original button text on error, but it's enabled
		buttonClasses += ' bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]';
		buttonDisabled = false; // Re-enable button on error
	} else {
		// Default state
		buttonClasses += ' bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]';
	}
	// --- End Button State Logic ---

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Cuéntanos tus intereses' size='large'>
			<form onSubmit={handleSubmit} className='space-y-6'>
				{interestData.map((category) => {
					// Determine which state set corresponds to the current category
					let currentSelections: Set<string>;
					if (category.title === 'Especialidades') {
						currentSelections = selectedEspecialidades;
					} else if (category.title === 'Contenido') {
						currentSelections = selectedContenido;
					} else {
						// Assumes '¿Qué te trae a MSK hoy?'
						currentSelections = selectedAdicionales;
					}

					return (
						<div key={category.title}>
							<h3 className='text-lg font-medium text-center mb-3 text-[#1A1A1A]'>{category.title}</h3>
							<div
								className={`w-full gap-2 ml-1 ${
									category.title === '¿Qué te trae a MSK hoy?'
										? 'grid grid-cols-1 md:grid-cols-2'
										: 'flex flex-wrap items-center justify-center'
								}`}
							>
								{category.options.map((option) => {
									const isSelected = currentSelections.has(option); // Use the correct state set
									// Define classes here to avoid repetition

									if (category.title === '¿Qué te trae a MSK hoy?') {
										// Checkbox style
										const checkboxSelectedClasses =
											'border-[#9200AD] bg-[#F7F3FF] outline outline-2 outline-offset-[-1px] outline-[#9200AD]';
										const checkboxUnselectedClasses = 'border-gray-300 bg-white';
										const checkboxCommonClasses =
											'flex items-center p-3 rounded-[14px] border cursor-pointer w-full transition-colors';
										return (
											<label
												key={option}
												className={`${checkboxCommonClasses} ${
													isSelected ? checkboxSelectedClasses : checkboxUnselectedClasses
												}`}
											>
												<input
													type='checkbox'
													checked={isSelected}
													onChange={() => handleToggleInterest(option, category.title)} // Pass category title
													className='sr-only'
												/>
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
										const selectedClasses = 'bg-[#DFE6FF] text-[#29324F] font-semibold';
										const unselectedClasses = 'bg-[#F7F9FF] text-[#29324F] hover:bg-[#DFE6FF]'; // Corrected hover class
										return (
											<button
												type='button'
												key={option}
												onClick={() => handleToggleInterest(option, category.title)} // Pass category title
												className={`${tagCommonClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
											>
												{option}
											</button>
										);
									}
								})}
							</div>{' '}
							{/* Close inner div for options grid/flex */}
						</div> // Close outer div for category
					);
				})}

				<div className='flex flex-col items-center pt-6 mt-6 mb-6'>
					{' '}
					{/* Use flex-col */}
					{saveError && !isSaving && (
						<p className='text-red-600 text-sm mb-2 text-center'>{saveError}</p> // Show error above button
					)}
					<button type='submit' className={buttonClasses} disabled={buttonDisabled}>
						{buttonContent}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default InterestsEditModal;

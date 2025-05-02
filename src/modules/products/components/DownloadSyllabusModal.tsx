'use client';

import CountrySelect from '@/modules/login/components/hooks/CountrySelect';
import { useState, useEffect, useRef } from 'react';

interface DownloadSyllabusModalProps {
	fileUrl: string;
	onClose: () => void;
	slug: string;
}

export default function DownloadSyllabusModal({ fileUrl, onClose, slug }: DownloadSyllabusModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);

	const [profession, setProfession] = useState("");
	const [specialty, setSpecialty] = useState("");
  
	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		phone: '',
		areaCode: '+54',
		profession: '',
		speciality: '',
		message: '',
		acceptTerms: false,
	});

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEscKey);
		return () => window.removeEventListener('keydown', handleEscKey);
	}, [onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (window.innerWidth <= 768 && !modalRef.current?.contains(e.target as Node)) {
			onClose();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const isCheckbox = type === 'checkbox';
		setFormData((prev) => ({
			...prev,
			[name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { name, email, acceptTerms } = formData;
		if (!name.trim() || !email.trim()) return alert('Por favor, completá tu nombre y correo electrónico.');
		if (!acceptTerms) return alert('Debes aceptar las condiciones de privacidad.');

		try {
			fetch(fileUrl)
				.then((response) => response.blob())
				.then((blob) => {
					const blobUrl = window.URL.createObjectURL(blob);
					const link = document.createElement('a');
					link.href = blobUrl;
					link.download = `${slug}.pdf`;
					document.body.appendChild(link);
					link.click();
					setTimeout(() => {
						document.body.removeChild(link);
						window.URL.revokeObjectURL(blobUrl);
						onClose();
					}, 100);
				})
				.catch(() => alert('Hubo un problema al descargar el archivo.'));
		} catch {
			alert('Hubo un problema al descargar el archivo.');
		}
	};

	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] px-4 !mt-0'
			onClick={(e) => {
				if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
				else e.stopPropagation();
			}}
		>
			<div ref={modalRef} className='relative bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg'>
				<button
					onClick={() => onClose()}
					type='button'
					className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl'
					aria-label='Cerrar'
				>
					×
				</button>
				<h2 className='text-2xl font-semibold mb-6 text-center'>Descarga el temario completo</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='flex flex-col md:flex-row gap-4'>
						<input
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Ingresar nombre'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						<input
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							placeholder='Ingresar apellido'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					</div>

					<div className='flex flex-col md:flex-row gap-4'>
						<input
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Ingresar e-mail'
							type='email'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						<div className='w-full'>
							<div className='flex gap-2 border rounded-2xl border-[#DBDDE2] px-[2.7px] py-1 focus-within:ring-4 focus-within:ring-[#F5E6F7]'>
								<div className='w-18'>
									<CountrySelect onChange={(code) => setFormData((prev) => ({ ...prev, areaCode: code }))} />
								</div>
								<input
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
									placeholder='Ingresar número telefónico'
									className='flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-[#6E737C]'
								/>
							</div>
						</div>
					</div>

					{/* Profession and Speciality */}
					<div className="col-span-1 md:col-span-1 space-y-3">
          {/* Profesión */}
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
          >
            <option value="">Seleccionar profesión</option>
            <option value="Personal médico/1">Personal médico</option>
            <option value="Residente/2">Residente</option>
            <option value="Licenciado de la salud/3">
              Licenciado de la salud
            </option>
            <option value="Personal de enfermería/4">
              Personal de enfermería
            </option>
            <option value="Auxiliar de enfermería/5">
              Auxiliar de enfermería
            </option>
            <option value="Fuerza pública/6">Fuerza pública</option>
            <option value="Técnico universitario/7">
              Técnico universitario
            </option>
            <option value="Estudiante/8">Estudiante</option>
            <option value="Tecnología Médica/9">Tecnología Médica</option>
            <option value="Otra Profesión">Otra Profesión</option>
          </select>
          {profession === "Otra Profesión" && (
            <input
              type="text"
              placeholder="Ingresar otra profesión"
              className="w-full border border-[#DBDDE2] rounded-[16px] px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[#F5E6F7]"
            />
          )}
        </div>
        <div className="col-span-1 md:col-span-1 space-y-3">
          {/* Especialidad */}
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full text-gray-600 border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2"
          >
            <option value="">Seleccionar especialidad</option>
            <option>Alergia e inmunología</option>
            <option>Anatomía patológica</option>
            <option>Coloproctología</option>
            <option>Flebología y linfología</option>
            <option>Hepatología</option>
            <option>Mastología</option>
            <option>Medicina de la industria farmaceútica</option>
            <option>Medicina del trabajo / ocupacional</option>
            <option>Medicina estética</option>
            <option>Medicina física y rehabilitación</option>
            <option>Medicina legal</option>
            <option>Medicina paliativa y dolor</option>
            <option>Medicina reproductiva y fertilidad</option>
            <option>Neumonología</option>
            <option>Reumatología</option>
            <option>Toxicología</option>
            <option>Trasplante</option>
            <option>Urología</option>
            <option>Enfermería familiar y comunitaria</option>
            <option>Enfermería en administración y gestión sanitaria</option>
            <option>Enfermería en análisis clínicos</option>
            <option>Enfermería en cardiología y UCO</option>
            <option>Enfermería en cuidados intensivos de adultos</option>
            <option>
              Enfermería en cuidados intensivos pediátricos y neonatales
            </option>
            <option>Enfermería en cuidados paliativos y dolor</option>
            <option>Enfermería en emergencias y atención primaria</option>
            <option>Enfermería en internación domiciliaria</option>
            <option>Enfermería en internación general</option>
            <option>Enfermería en investigación</option>
            <option>Enfermería en lactancia y puerperio</option>
            <option>Enfermería en reproducción asistida</option>
            <option>Enfermería en salud mental</option>
            <option>Enfermería en unidades de trasplantes</option>
            <option>Enfermería escolar</option>
            <option>Enfermería geriátrica y gerontológica</option>
            <option>Enfermería hematológica</option>
            <option>Enfermería nefrológica y diálisis</option>
            <option>Enfermería neonatal</option>
            <option>Enfermería obstétrica y ginecológica</option>
            <option>Enfermería oncológica</option>
            <option>Enfermería pediátrica</option>
            <option>Enfermería quirúrgica</option>
            <option>Enfermería radiológica</option>
            <option>Otras especialidades</option>
            <option>Producción de bioimágenes</option>
            <option>Bioquímica</option>
            <option>Psicología</option>
            <option>Farmacia</option>
            <option>Instrumentación quirúrgica</option>
            <option>Kinesiología y fisiatría</option>
            <option>Óptica</option>
            <option>Osteopatía</option>
            <option>Podología</option>
            <option>Terapia ocupacional</option>
            <option>Otra carrera o licenciatura</option>
            <option>Tecnicatura en laboratorio clínico</option>
            <option>Tecnicatura en radiología e imágenes diagnósticas</option>
            <option>Tecnicatura en atención de adicciones</option>
            <option>Tecnicatura en optometría</option>
            <option>Tecnicatura en hemoterapia e inmunohematología</option>
            <option>
              Tecnicatura en partería profesional con enfoque intercultural
            </option>
            <option>Tecnicatura en visita médica</option>
            <option>Tecnicatura en cuidados geriátricos</option>
            <option>
              Tecnicatura en tecnología en ciencias del esteticismo
            </option>
            <option>Tecnicatura en ciencia y tecnología de alimentos</option>
            <option>Tecnicatura en prácticas cardiológicas</option>
            <option>Tecnicatura en esterilización</option>
            <option>Tecnicatura en asistencia dental</option>
            <option>Tecnicatura en cosmetología</option>
            <option>Policía</option>
            <option>Bombero</option>
            <option>Guardavidas / Rescatista</option>
            <option>Auditoría y administración sanitaria</option>
            <option>Diabetes</option>
            <option>Generalista</option>
            <option>Medicina del deporte</option>
            <option>Medicina familiar y comunitaria</option>
            <option>Medicina intensiva</option>
            <option>Medicina interna / clínica</option>
            <option>Nutrición</option>
            <option>Traumatología y ortopedia</option>
            <option>Anestesiología</option>
            <option>Diagnóstico por Imágenes</option>
            <option>Cardiología</option>
            <option>Cirugía</option>
            <option>Cuidados críticos e intensivos</option>
            <option>Dermatología</option>
            <option>Emergentología</option>
            <option>Endocrinología</option>
            <option>Gastroenterología</option>
            <option>Generalista - Clínica - Medicina interna</option>
            <option>Geriatría y Gerontología</option>
            <option>Ginecología</option>
            <option>Hematología</option>
            <option>Infectología</option>
            <option>Internación domiciliaria y cuidados paliativos</option>
            <option>Nefrología</option>
            <option>Neonatología</option>
            <option>Neurología</option>
            <option>Nutrición y alimentación</option>
            <option>Obstetricia</option>
            <option>Obstetricia y Ginecología</option>
            <option>Odontología</option>
            <option>Oftalmología</option>
            <option>Oncología</option>
            <option>Ortopedia y Traumatología</option>
            <option>Otorrinolaringología</option>
            <option>Pediatría</option>
            <option>Psiquiatría</option>
            <option>Radiología</option>
            <option>Bioanálisis Clínico-molecular</option>
            <option>Medicina Transfusional</option>
            <option>Imagenología</option>
            <option>Radioterapia</option>
            <option>Física Médica</option>
            <option>Morfofisiopatología y Citodiagnóstico</option>
            <option>Otra Especialidad</option>
          </select>
          {specialty === "Otra Especialidad" && (
            <input
              type="text"
              placeholder="Ingresar otra especialidad"
              className="w-full border border-[#DBDDE2] rounded-[16px] px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[#F5E6F7]"
            />
          )}
        </div>


					{/* Message */}
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						placeholder='Deja tu mensaje'
						rows={4}
						className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
					></textarea>

					{/* Terms and Conditions */}
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='acceptTerms'
							name='acceptTerms'
							checked={formData.acceptTerms}
							onChange={handleChange}
							className='text-[#8A8A8A]'
						/>
						<label htmlFor='acceptTerms' className='text-xs text-[#8A8A8A] leading-5'>
							Acepto los{' '}
							<a href='#' className='underline'>
								términos y condiciones
							</a>
						</label>
					</div>

					<button type='submit' className='w-full py-2 mt-4 text-white bg-[#9200ad] rounded-xl hover:bg-[#a84db4]'>
						Descargar temario
					</button>
				</form>
			</div>
		</div>
	);
}

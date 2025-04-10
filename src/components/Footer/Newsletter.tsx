import { Newsletter, Profession, Specialty } from '@/data/types';
import React, { FC, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { utmInitialState, utmReducer } from '@/context/utm/UTMReducer';
import * as Yup from 'yup';
import { ErrorMessage, Field, FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { CountryContext } from '@/context/country/CountryContext';
import { DataContext } from '@/context/data/DataContext';
import NcLink from '../NcLink/NcLink';
import api from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import ShowErrorMessage from '@/components/ShowErrorMessage';
import { useYupValidation } from '@/hooks/useYupValidation';

interface Props {
	email: string;
	setShow: (state: boolean) => void;
}
export function isFormValid(requiredFields: string[], formValues: any, formErrors: any, formTouched: any) {
	for (let i = 0; i < requiredFields.length; i++) {
		const fieldName = requiredFields[i];

		// Verificar si el campo está en formValues y tiene un valor válido
		if (
			!(fieldName in formValues) ||
			formValues[fieldName] === '' ||
			formValues[fieldName] === null ||
			formValues[fieldName] === false
		) {
			if (fieldName.includes('Preferencia_de_contactaci_n')) {
				//los Ebooks no tienen este campo
				continue;
			}
			return false;
		}

		// Verificar si el campo está en formErrors y ha sido tocado
		if (fieldName in formErrors && formTouched[fieldName]) {
			return false;
		}

		// Verificar condiciones específicas para el campo "profesion"
		if (fieldName === 'Profesion') {
			// Verificar si "profesion" contiene "estudiante"
			if (formValues[fieldName].includes('Estudiante')) {
				// Si contiene "estudiante", no es necesario validar "Especialidad"
				continue;
			}
		}

		// Verificar condiciones específicas para los campos "year" y "carrer"
		if (fieldName === 'year' || fieldName === 'career') {
			// Verificar si los campos no están vacíos
			if (formValues[fieldName] === '') {
				return false;
			}
		}
	}
	return true;
}

const { newsletterValidation } = useYupValidation();
const FooterNewsletter: FC<Props> = ({ email, setShow }) => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const { state: dataState } = useContext(DataContext);
	const { allProfessions, allSpecialties, allSpecialtiesGroups } = dataState;
	const [professions, setProfessions] = useState<Profession[]>([]);
	const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);

	useEffect(() => {
		setProfessions(allProfessions);
		setSpecialties(allSpecialties);
		setSpecialtiesGroup(allSpecialtiesGroups);
	}, [allProfessions, allSpecialties]);

	const [specialties, setSpecialties] = useState([]);
	const [newsletterSpecialties, setNewsletterSpecialties] = useState([]);
	const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState('');
	const [selectedOptionProfession, setSelectedOptionProfession] = useState('');
	const [showInputProfession, setShowInputProfession] = useState(false);
	const [showInputSpecialties, setShowInputSpecialties] = useState(false);
	const [selectedProfessionId, setSelectedProfessionId] = useState<string>('');
	const [currentGroup, setCurrentGroup] = useState<any>([]);
	const [studentInputs, setStudentInputs] = useState(false);
	const [formError, setFormError] = useState('');
	const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
	const { countryState } = useContext(CountryContext);

	const fetchNewsletterSpecialties = async () => {
		const newsletterSpecialtyList = await api.getNewsletterSpecialties();
		setNewsletterSpecialties(newsletterSpecialtyList);
	};

	const handleOptionSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		setSelectedOptionSpecialty(value);
		formik.setFieldValue('Especialidad', value);
		setShowInputSpecialties(value === 'Otra Especialidad');
	};

	const handleOptionProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (value && value.length) {
			const values = value.split('/');
			const profession = values[0];
			const id = values[1];
			setSelectedOptionProfession(profession);
			setSelectedProfessionId(id);
			setShowInputProfession(profession === 'Otra profesión');
			setStudentInputs(profession === 'Estudiante');
			formik.setFieldValue('Profesion', profession);

			const groups = specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
			setCurrentGroup(groups);
		} else {
			setSelectedOptionProfession('');
			setSelectedProfessionId('');
			formik.setFieldValue('Profesion', '');
		}
	};

	useEffect(() => {
		fetchNewsletterSpecialties();
	}, []);

	const router = useRouter();

	const changeRoute = (newRoute: string): void => {
		router.push(newRoute);
	};

	const formRef = useRef<HTMLFormElement>(null!);

	const resetForm = () => {
		formRef.current.reset();
	};

	const optionsArray = [1, 2, 3, 4, 5];

	const initialValues = {
		First_Name: '',
		Last_Name: '',
		Email: email,
		Profesion: '',
		Especialidad: '',
		Temas_de_interes: [] as any,
		Terms_And_Conditions2: false,
		Otra_profesion: '',
		Otra_especialidad: '',
		country: countryState?.country,
		utm_source: utmState.utm_source,
		utm_medium: utmState.utm_medium,
		utm_campaign: utmState.utm_campaign,
		utm_content: utmState.utm_content,
		URL_ORIGEN: window.location.href,
	};
	const formik = useFormik({
		initialValues,
		validationSchema: newsletterValidation,
		onSubmit: async (values) => {
			if (executeRecaptcha) {
				const body = {
					...values,
					recaptcha_token: await executeRecaptcha('newsletter'),
					country: countryState?.country,
				};
				try {
					let response = await api.postNewsletter(body as Newsletter);
					// @ts-ignore
					if (response.data[0].code === 'SUCCESS') {
						setShow(false);
						resetForm();
						setTimeout(() => {
							changeRoute('/gracias?origen=newsletter');
						}, 100);
					} else {
						setFormError('Hubo un error al enviar el formulario, revise los campos');
					}
				} catch (error) {
					console.error('Error al ejecutar reCAPTCHA:', error);
				}
			}
		},
	});

	const requiredFormFields = ['First_Name', 'Last_Name', 'Email', 'Profesion', 'Temas_de_interes', 'Terms_And_Conditions2'];

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';

	const isSubmitDisabled = !formik.dirty || !isFormValid(requiredFormFields, formik.values, formik.errors, formik.touched);
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={formik.handleSubmit} action='/leads' className='' autoComplete='off' ref={formRef}>
				<input type='hidden' name='URL_ORIGEN' id='URL_ORIGEN' value={window.location.href} />
				<input type='hidden' name='country' value={countryState?.country} />
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3 grid-row-6'>
					<div className=''>
						<div className='contact-from-input'>
							<ErrorMessage name='First_Name' component='span' className='error' />
							<Field type='text' name='First_Name' placeholder='Ingresar nombre' />
						</div>
					</div>
					<div className=''>
						<div className='contact-from-input'>
							<ErrorMessage name='Last_Name' component='span' className='error' />
							<Field type='text' name='Last_Name' placeholder='Ingresar apellido' />
						</div>
					</div>
					<div className=''>
						<div className='contact-from-input '>
							<ErrorMessage name='Email' component='span' className='error' />
							<Field type='email' name='Email' placeholder='Ingresar correo electrónico' />
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-3 grid-row-6'>
					<div className='contact-select'>
						<div className='contact-select'>
							<ErrorMessage name='Profesion' component='span' className='error' />
							<Field
								as='select'
								name='Profesion'
								onChange={handleOptionProfessionChange}
								value={`${selectedOptionProfession}/${selectedProfessionId}`}
							>
								<option defaultValue='' value=''>
									Seleccionar profesión
								</option>
								{professions && professions.length
									? professions.map((p: Profession) => (
											<option key={p.id} value={`${p.name}/${p.id}`}>
												{p.name}
											</option>
									  ))
									: ''}
							</Field>
						</div>
						{showInputProfession && (
							<div className='my-4 contact-from-input'>
								<ErrorMessage name='Otra_profesion' component='span' className='error' />
								<Field type='text' name='Otra_profesion' placeholder='Ingresar profesion' />
							</div>
						)}
					</div>
					{studentInputs ? (
						<div className='flex gap-2 col-xl-12'>
							<div className='w-1/2 contact-select'>
								<ErrorMessage name='year' component='span' className='error' />
								<Field as='select' name='year'>
									<option defaultValue=''>Año</option>
									{optionsArray.map((y) => (
										<option key={`st_year_${y}`} defaultValue={y}>
											{y}
										</option>
									))}
								</Field>
							</div>
							<div className='w-full contact-select'>
								<ErrorMessage name='career' component='span' className='error' />
								<Field as='select' name='career'>
									<option defaultValue=''>Seleccionar carrera</option>
									{currentGroup.map((s: any) => (
										<option key={`st_carrer_${s.id}`} defaultValue={s.name}>
											{s.name}
										</option>
									))}
								</Field>
							</div>
						</div>
					) : (
						<>
							<div className={`col-xl-6`}>
								<div className='contact-select'>
									<ErrorMessage name='Especialidad' component='span' className='error' />
									<Field
										as='select'
										name='Especialidad'
										onChange={handleOptionSpecialtyChange}
										value={selectedOptionSpecialty}
									>
										<option defaultValue='' value=''>
											Seleccionar especialidad
										</option>
										{selectedOptionProfession && currentGroup.length
											? currentGroup.map((s: any) => (
													<option key={`sp_group_${s.id}`} defaultValue={s.name}>
														{s.name}
													</option>
											  ))
											: specialties?.map((s: { id: string; name: string }) => (
													<option key={`sp_${s.id}`} defaultValue={s.name}>
														{s.name}
													</option>
											  ))}
									</Field>
								</div>
								{showInputSpecialties && (
									<div className='my-4 contact-from-input'>
										<ErrorMessage name='Otra_especialidad' component='span' className='error' />
										<Field type='text' name='Otra_especialidad' placeholder='Ingresar especialidad' />
									</div>
								)}
							</div>
						</>
					)}
				</div>
				<div className='contact-array-list'>
					<h3 className='mt-6 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 font-raleway'>
						Selecciona tus temas de interés
					</h3>
					<ErrorMessage name='Temas_de_interes' component='span' className='text-left error' />
					<FieldArray name='Temas_de_interes'>
						{({ push, remove }) => (
							<div className='grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 lg:grid-cols-3 grid-row-6'>
								{newsletterSpecialties && newsletterSpecialties.length
									? newsletterSpecialties.map((specialty: { name: string; id: number }, index: number) => (
											<div key={specialty.id} className='interest-topics'>
												<label>
													<Field
														type='checkbox'
														name={`Temas_de_interes[${index}]`}
														value={specialty.name}
														checked={formik.values.Temas_de_interes.includes(specialty.name)}
														onChange={(e: any) => {
															const isChecked = e.target.checked;
															if (isChecked) {
																push(specialty.name);
															} else {
																const idx = formik.values.Temas_de_interes.indexOf(specialty.name);
																if (idx !== -1) {
																	remove(idx);
																}
															}
														}}
													/>
													<span>{specialty.name}</span>
												</label>
											</div>
									  ))
									: null}
							</div>
						)}
					</FieldArray>
				</div>

				<div className='flex flex-wrap items-center justify-center gap-8'>
					<div className='contact-checkbox'>
						<ErrorMessage name='Terms_And_Conditions2' component='span' className='error' />
						<div className='flex gap-2 center'>
							<Field
								type='checkbox'
								name='Terms_And_Conditions2'
								checked={formik.values.Terms_And_Conditions2}
								className='hidden-checkbox mt-0.5'
							/>
							<label>
								Acepto las{' '}
								<NcLink
									href={
										country === ''
											? `${window.location.origin}/politica-de-privacidad/`
											: `${window.location.origin}/${country}/politica-de-privacidad/`
									}
									target='_blank'
									className='text-primary'
								>
									politicas de privacidad
								</NcLink>
							</label>
						</div>
					</div>

					<div>
						<button
							type='submit'
							id='submit-newsletter'
							className='flex rounded cont-btn center'
							disabled={isSubmitDisabled}
						>
							<div className='flex gap-2 px-2 my-auto text-sm center'>
								Suscribirme
								<Image width={15} height={15} alt='suscribe icon' src='/images/icons/plane.svg' className='subscribe-icon' />
							</div>
						</button>
					</div>
				</div>
				<ShowErrorMessage text={formError} visible={Boolean(formError)} />
			</Form>
		</FormikProvider>
	);
};

export default FooterNewsletter;

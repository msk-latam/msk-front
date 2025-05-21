'use client';
import React, { FC, useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import ContactSidebar from './ContactSidebar';
import 'react-phone-number-input/style.css';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { Newsletter, Profession, Specialty } from '@/data/types';
import { getName } from 'country-list';
import { CountryContext } from '@/context/country/CountryContext';
import { CountryCode } from 'libphonenumber-js/types';
import { utmInitialState, utmReducer } from '@/context/utm/UTMReducer';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { ContactFormSchema, useYupValidation } from '@/hooks/useYupValidation';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { DataContext } from '@/context/data/DataContext';
import api from '@/services/api';
import NcLink from '../NcLink/NcLink';
import { usePathname, useRouter } from 'next/navigation';
import { isFormValid } from '@/components/Footer/Newsletter';
// import Checkbox from '../Checkbox/Checkbox';
import ShowErrorMessage from '../ShowErrorMessage';
import Checkbox from '@/modules/store/components/ui/Checkbox';
import CountrySelect from '@/modules/login/components/hooks/CountrySelect';
import Link from 'next/link';

interface ContactFormProps {
	hideHeader?: boolean;
	hideSideInfo?: boolean;
	productName?: string | undefined;
	isEbook?: boolean;
	resourceMedia?: string | boolean;
	hideContactPreference?: boolean;
	submitText?: string;
	isDownload?: boolean;
	updateFormSent?: (value: boolean, body: any) => void;
	submitReason?: string;
	submitEndpoint?: string;
}
interface ContactFormWrapperProps extends ContactFormProps {
	isNosotros?: boolean;
}

const ContactForm: FC<ContactFormWrapperProps> = ({
	hideHeader = false,
	productName = '',
	isEbook = false,
	resourceMedia,
	hideSideInfo,
	hideContactPreference,
	submitText = isEbook ? 'Descargar' : 'Enviar',
	submitEndpoint = 'contact',
	isDownload,
	submitReason,
	updateFormSent,
	isNosotros,
}) => {
	const { state: dataState } = useContext(DataContext);
	const {
		// allProfessions,
		allSpecialties,
		//   allSpecialtiesGroups
	} = dataState;
	const { countryState } = useContext(CountryContext);
	const [defaultCountry, setDefaultCountry] = useState<CountryCode>('' as CountryCode);
	const pathname = usePathname();
	const resourcePDFName = pathname.split('/').filter(Boolean).pop();

	useEffect(() => {
		setDefaultCountry(countryState.country?.toUpperCase() as CountryCode);
	}, [countryState]);

	const [professions, setProfessions] = useState<Profession[]>([]);
	const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
	const [specialties, setSpecialties] = useState<Specialty[]>([]);
	const [showInputProfession, setShowInputProfession] = useState(false);
	const [showInputSpecialties, setShowInputSpecialties] = useState(false);
	const [selectedOptionProfession, setSelectedOptionProfession] = useState<string>('');
	const [selectedProfessionId, setSelectedProfessionId] = useState<string>('');
	const [currentGroup, setCurrentGroup] = useState<any>([]);
	const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState<string>('');
	const [selectedCareer, setSelectedCareer] = useState('');
	const [phoneNumber, setPhoneNumber] = useState<string>('');
	const [selectedCountry, setSelectedCountry] = useState<string>('');
	const [formSent, setFormSent] = useState(false);
	const [studentInputs, setStudentInputs] = useState(false);
	const [formError, setFormError] = useState('');
	const [onRequest, setOnRequest] = useState(false);
	const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
	const formRef = useRef<HTMLFormElement>(null);
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [urlOrigen, setUrlOrigen] = useState<string>(typeof window !== 'undefined' ? window.location.href : '');
	const router = useRouter();
	const allSpecialtiesGroups: any = {
		'1': [
			{
				id: 1,
				name: 'Alergia e inmunología',
			},
			{
				id: 2,
				name: 'Anatomía patológica',
			},
			{
				id: 3,
				name: 'Coloproctología',
			},
			{
				id: 4,
				name: 'Flebología y linfología',
			},
			{
				id: 5,
				name: 'Hepatología',
			},
			{
				id: 6,
				name: 'Mastología',
			},
			{
				id: 7,
				name: 'Medicina de la industria farmaceútica',
			},
			{
				id: 8,
				name: 'Medicina del trabajo / ocupacional',
			},
			{
				id: 9,
				name: 'Medicina estética',
			},
			{
				id: 10,
				name: 'Medicina física y rehabilitación',
			},
			{
				id: 11,
				name: 'Medicina legal',
			},
			{
				id: 12,
				name: 'Medicina paliativa y dolor',
			},
			{
				id: 13,
				name: 'Medicina reproductiva y fertilidad',
			},
			{
				id: 14,
				name: 'Neumonología',
			},
			{
				id: 15,
				name: 'Reumatología',
			},
			{
				id: 16,
				name: 'Toxicología',
			},
			{
				id: 17,
				name: 'Trasplante',
			},
			{
				id: 18,
				name: 'Urología',
			},
			{
				id: 73,
				name: 'Auditoría y administración sanitaria',
			},
			{
				id: 74,
				name: 'Diabetes',
			},
			{
				id: 75,
				name: 'Generalista',
			},
			{
				id: 76,
				name: 'Medicina del deporte',
			},
			{
				id: 77,
				name: 'Medicina familiar y comunitaria',
			},
			{
				id: 78,
				name: 'Medicina intensiva',
			},
			{
				id: 79,
				name: 'Medicina interna / clínica',
			},
			{
				id: 80,
				name: 'Nutrición',
			},
			{
				id: 81,
				name: 'Traumatología y ortopedia',
			},
			{
				id: 82,
				name: 'Anestesiología',
			},
			{
				id: 84,
				name: 'Cardiología',
			},
			{
				id: 85,
				name: 'Cirugía',
			},
			{
				id: 87,
				name: 'Dermatología',
			},
			{
				id: 88,
				name: 'Emergentología',
			},
			{
				id: 89,
				name: 'Endocrinología',
			},
			{
				id: 90,
				name: 'Gastroenterología',
			},
			{
				id: 93,
				name: 'Ginecología',
			},
			{
				id: 94,
				name: 'Hematología',
			},
			{
				id: 95,
				name: 'Infectología',
			},
			{
				id: 97,
				name: 'Nefrología',
			},
			{
				id: 98,
				name: 'Neonatología',
			},
			{
				id: 99,
				name: 'Neurología',
			},
			{
				id: 101,
				name: 'Obstetricia',
			},
			{
				id: 102,
				name: 'Obstetricia y Ginecología',
			},
			{
				id: 104,
				name: 'Oftalmología',
			},
			{
				id: 105,
				name: 'Oncología',
			},
			{
				id: 107,
				name: 'Otorrinolaringología',
			},
			{
				id: 108,
				name: 'Pediatría',
			},
			{
				id: 109,
				name: 'Psiquiatría',
			},
		],
		'2': [
			{
				id: 1,
				name: 'Alergia e inmunología',
			},
			{
				id: 2,
				name: 'Anatomía patológica',
			},
			{
				id: 3,
				name: 'Coloproctología',
			},
			{
				id: 4,
				name: 'Flebología y linfología',
			},
			{
				id: 5,
				name: 'Hepatología',
			},
			{
				id: 6,
				name: 'Mastología',
			},
			{
				id: 7,
				name: 'Medicina de la industria farmaceútica',
			},
			{
				id: 8,
				name: 'Medicina del trabajo / ocupacional',
			},
			{
				id: 9,
				name: 'Medicina estética',
			},
			{
				id: 10,
				name: 'Medicina física y rehabilitación',
			},
			{
				id: 11,
				name: 'Medicina legal',
			},
			{
				id: 12,
				name: 'Medicina paliativa y dolor',
			},
			{
				id: 13,
				name: 'Medicina reproductiva y fertilidad',
			},
			{
				id: 14,
				name: 'Neumonología',
			},
			{
				id: 15,
				name: 'Reumatología',
			},
			{
				id: 16,
				name: 'Toxicología',
			},
			{
				id: 17,
				name: 'Trasplante',
			},
			{
				id: 18,
				name: 'Urología',
			},
			{
				id: 73,
				name: 'Auditoría y administración sanitaria',
			},
			{
				id: 74,
				name: 'Diabetes',
			},
			{
				id: 75,
				name: 'Generalista',
			},
			{
				id: 76,
				name: 'Medicina del deporte',
			},
			{
				id: 77,
				name: 'Medicina familiar y comunitaria',
			},
			{
				id: 78,
				name: 'Medicina intensiva',
			},
			{
				id: 79,
				name: 'Medicina interna / clínica',
			},
			{
				id: 80,
				name: 'Nutrición',
			},
			{
				id: 81,
				name: 'Traumatología y ortopedia',
			},
			{
				id: 82,
				name: 'Anestesiología',
			},
			{
				id: 84,
				name: 'Cardiología',
			},
			{
				id: 85,
				name: 'Cirugía',
			},
			{
				id: 87,
				name: 'Dermatología',
			},
			{
				id: 88,
				name: 'Emergentología',
			},
			{
				id: 89,
				name: 'Endocrinología',
			},
			{
				id: 90,
				name: 'Gastroenterología',
			},
			{
				id: 93,
				name: 'Ginecología',
			},
			{
				id: 94,
				name: 'Hematología',
			},
			{
				id: 95,
				name: 'Infectología',
			},
			{
				id: 97,
				name: 'Nefrología',
			},
			{
				id: 98,
				name: 'Neonatología',
			},
			{
				id: 99,
				name: 'Neurología',
			},
			{
				id: 101,
				name: 'Obstetricia',
			},
			{
				id: 102,
				name: 'Obstetricia y Ginecología',
			},
			{
				id: 104,
				name: 'Oftalmología',
			},
			{
				id: 105,
				name: 'Oncología',
			},
			{
				id: 107,
				name: 'Otorrinolaringología',
			},
			{
				id: 108,
				name: 'Pediatría',
			},
			{
				id: 109,
				name: 'Psiquiatría',
			},
		],
		'3': [
			{
				id: 45,
				name: 'Producción de bioimágenes',
			},
			{
				id: 46,
				name: 'Bioquímica',
			},
			{
				id: 47,
				name: 'Psicología',
			},
			{
				id: 48,
				name: 'Farmacia',
			},
			{
				id: 49,
				name: 'Instrumentación quirúrgica',
			},
			{
				id: 50,
				name: 'Kinesiología y fisiatría',
			},
			{
				id: 51,
				name: 'Óptica',
			},
			{
				id: 52,
				name: 'Osteopatía',
			},
			{
				id: 53,
				name: 'Podología',
			},
			{
				id: 54,
				name: 'Terapia ocupacional',
			},
			{
				id: 55,
				name: 'Otra carrera o licenciatura',
			},
			{
				id: 80,
				name: 'Nutrición',
			},
			{
				id: 101,
				name: 'Obstetricia',
			},
			{
				id: 103,
				name: 'Odontología',
			},
			{
				id: 110,
				name: 'Radiología',
			},
		],
		'4': [
			{
				id: 19,
				name: 'Enfermería familiar y comunitaria',
			},
			{
				id: 20,
				name: 'Enfermería en administración y gestión sanitaria',
			},
			{
				id: 21,
				name: 'Enfermería en análisis clínicos',
			},
			{
				id: 22,
				name: 'Enfermería en cardiología y UCO',
			},
			{
				id: 23,
				name: 'Enfermería en cuidados intensivos de adultos',
			},
			{
				id: 24,
				name: 'Enfermería en cuidados intensivos pediátricos y neonatales',
			},
			{
				id: 25,
				name: 'Enfermería en cuidados paliativos y dolor',
			},
			{
				id: 26,
				name: 'Enfermería en emergencias y atención primaria',
			},
			{
				id: 27,
				name: 'Enfermería en internación domiciliaria',
			},
			{
				id: 28,
				name: 'Enfermería en internación general',
			},
			{
				id: 29,
				name: 'Enfermería en investigación',
			},
			{
				id: 30,
				name: 'Enfermería en lactancia y puerperio',
			},
			{
				id: 31,
				name: 'Enfermería en reproducción asistida',
			},
			{
				id: 32,
				name: 'Enfermería en salud mental',
			},
			{
				id: 33,
				name: 'Enfermería en unidades de trasplantes',
			},
			{
				id: 34,
				name: 'Enfermería escolar',
			},
			{
				id: 35,
				name: 'Enfermería geriátrica y gerontológica',
			},
			{
				id: 36,
				name: 'Enfermería hematológica',
			},
			{
				id: 37,
				name: 'Enfermería nefrológica y diálisis',
			},
			{
				id: 38,
				name: 'Enfermería neonatal',
			},
			{
				id: 39,
				name: 'Enfermería obstétrica y ginecológica',
			},
			{
				id: 40,
				name: 'Enfermería oncológica',
			},
			{
				id: 41,
				name: 'Enfermería pediátrica',
			},
			{
				id: 42,
				name: 'Enfermería quirúrgica',
			},
			{
				id: 43,
				name: 'Enfermería radiológica',
			},
			{
				id: 44,
				name: 'Otras especialidades',
			},
		],
		'5': [
			{
				id: 19,
				name: 'Enfermería familiar y comunitaria',
			},
			{
				id: 20,
				name: 'Enfermería en administración y gestión sanitaria',
			},
			{
				id: 21,
				name: 'Enfermería en análisis clínicos',
			},
			{
				id: 22,
				name: 'Enfermería en cardiología y UCO',
			},
			{
				id: 23,
				name: 'Enfermería en cuidados intensivos de adultos',
			},
			{
				id: 24,
				name: 'Enfermería en cuidados intensivos pediátricos y neonatales',
			},
			{
				id: 25,
				name: 'Enfermería en cuidados paliativos y dolor',
			},
			{
				id: 26,
				name: 'Enfermería en emergencias y atención primaria',
			},
			{
				id: 27,
				name: 'Enfermería en internación domiciliaria',
			},
			{
				id: 28,
				name: 'Enfermería en internación general',
			},
			{
				id: 29,
				name: 'Enfermería en investigación',
			},
			{
				id: 30,
				name: 'Enfermería en lactancia y puerperio',
			},
			{
				id: 31,
				name: 'Enfermería en reproducción asistida',
			},
			{
				id: 32,
				name: 'Enfermería en salud mental',
			},
			{
				id: 33,
				name: 'Enfermería en unidades de trasplantes',
			},
			{
				id: 34,
				name: 'Enfermería escolar',
			},
			{
				id: 35,
				name: 'Enfermería geriátrica y gerontológica',
			},
			{
				id: 36,
				name: 'Enfermería hematológica',
			},
			{
				id: 37,
				name: 'Enfermería nefrológica y diálisis',
			},
			{
				id: 38,
				name: 'Enfermería neonatal',
			},
			{
				id: 39,
				name: 'Enfermería obstétrica y ginecológica',
			},
			{
				id: 40,
				name: 'Enfermería oncológica',
			},
			{
				id: 41,
				name: 'Enfermería pediátrica',
			},
			{
				id: 42,
				name: 'Enfermería quirúrgica',
			},
			{
				id: 43,
				name: 'Enfermería radiológica',
			},
			{
				id: 44,
				name: 'Otras especialidades',
			},
		],
		'6': [
			{
				id: 70,
				name: 'Policía',
			},
			{
				id: 71,
				name: 'Bombero',
			},
			{
				id: 72,
				name: 'Guardavidas / Rescatista',
			},
		],
		'7': [
			{
				id: 56,
				name: 'Tecnicatura en laboratorio clínico',
			},
			{
				id: 57,
				name: 'Tecnicatura en radiología e imágenes diagnósticas',
			},
			{
				id: 58,
				name: 'Tecnicatura en atención de adicciones',
			},
			{
				id: 59,
				name: 'Tecnicatura en optometría',
			},
			{
				id: 60,
				name: 'Tecnicatura en hemoterapia e inmunohematología',
			},
			{
				id: 61,
				name: 'Tecnicatura en partería profesional con enfoque intercultural',
			},
			{
				id: 62,
				name: 'Tecnicatura en visita médica',
			},
			{
				id: 63,
				name: 'Tecnicatura en cuidados geriátricos',
			},
			{
				id: 64,
				name: 'Tecnicatura en tecnología en ciencias del esteticismo',
			},
			{
				id: 65,
				name: 'Tecnicatura en ciencia y tecnología de alimentos',
			},
			{
				id: 66,
				name: 'Tecnicatura en prácticas cardiológicas',
			},
			{
				id: 67,
				name: 'Tecnicatura en esterilización',
			},
			{
				id: 68,
				name: 'Tecnicatura en asistencia dental',
			},
			{
				id: 69,
				name: 'Tecnicatura en cosmetología',
			},
		],
		'8': [
			{
				id: 1,
				name: 'Medicina',
			},
			{
				id: 2,
				name: 'Enfermería',
			},
			{
				id: 3,
				name: 'Lic. en salud',
			},
			{
				id: 4,
				name: 'Técnico en salud',
			},
			{
				id: 5,
				name: 'Otra',
			},
		],
		'9': [
			{
				id: 94,
				name: 'Hematología',
			},
			{
				id: 104,
				name: 'Oftalmología',
			},
			{
				id: 107,
				name: 'Otorrinolaringología',
			},
			{
				id: 111,
				name: 'Bioanálisis Clínico-molecular',
			},
			{
				id: 112,
				name: 'Medicina Transfusional',
			},
			{
				id: 113,
				name: 'Imagenología',
			},
			{
				id: 114,
				name: 'Radioterapia',
			},
			{
				id: 115,
				name: 'Física Médica',
			},
			{
				id: 116,
				name: 'Morfofisiopatología y Citodiagnóstico',
			},
		],
		'10': [],
	};

	const allProfessions = [
		{
			id: 1,
			name: 'Personal médico',
		},
		{
			id: 2,
			name: 'Residente',
		},
		{
			id: 3,
			name: 'Licenciado en salud',
		},
		{
			id: 4,
			name: 'Personal de enfermería',
		},
		{
			id: 5,
			name: 'Auxiliar de enfermería',
		},
		{
			id: 6,
			name: 'Fuerza pública',
		},
		{
			id: 7,
			name: 'Técnico universitario',
		},
		{
			id: 8,
			name: 'Estudiante',
		},
		{
			id: 9,
			name: 'Tecnología médica',
		},
		{
			id: 10,
			name: 'Otra profesión',
		},
	];
	useEffect(() => {
		setProfessions(allProfessions);
		setSpecialties(allSpecialties);
		setSpecialtiesGroup(allSpecialtiesGroups);
	}, [allSpecialties]);

	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			// console.log("Execute recaptcha not yet available");
			return;
		}
		const token = await executeRecaptcha('yourAction');
	}, [executeRecaptcha]);

	const initialValues: ContactFormSchema = {
		First_Name: '',
		Last_Name: '',
		Email: '',
		Profesion: '',
		Description: '',
		Especialidad: '',
		Phone: '',
		// Preferencia_de_contactaci_n: '',
		Pais: '',
		Otra_profesion: '',
		Otra_especialidad: '',
		utm_source: utmState.utm_source,
		utm_medium: utmState.utm_medium,
		utm_campaign: utmState.utm_campaign,
		utm_content: utmState.utm_content,
		Terms_And_Conditions: false,
		year: '',
		career: '',
		URL_ORIGEN: urlOrigen,
		leadSource: '',
		Ebook_consultado: isEbook ? productName : null,
		Cursos_consultados: isEbook ? null : productName,
	};

	const { contactFormValidation } = useYupValidation();
	const changeRoute = (newRoute: any): void => {
		router.push(newRoute);
	};

	const handlePhoneChange = (value: string) => {
		if (typeof value !== 'undefined') {
			const parsedPhoneNumber = parsePhoneNumber(value);
			if (parsedPhoneNumber?.country) {
				const country = getName(parsedPhoneNumber.country) as string;
				setSelectedCountry(country);
				setPhoneNumber(value);
				formik.setFieldValue('Pais', country);
			}
		}
	};

	const resetForm = () => {
		if (formRef.current) {
			formRef.current.reset();
		}
	};

	const handleOptionSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		setSelectedOptionSpecialty(value);
		formik.setFieldValue('Especialidad', value);
		setShowInputSpecialties(value === 'Otra Especialidad');
	};

	const handleOptionCareerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		formik.values.career = value;
		setSelectedCareer(value);
	};

	const handleOptionProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (value && value.length) {
			const values = value.split('/');
			const profession = values[0];
			const id = values[1];
			setSelectedOptionProfession(profession);
			formik.setFieldValue('Profesion', profession);
			setSelectedProfessionId(id);
			setShowInputProfession(profession === 'Otra profesión');
			setStudentInputs(profession === 'Estudiante');
			const groups = specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
			setCurrentGroup(groups);
		} else {
			setSelectedOptionProfession('');
			setSelectedProfessionId('');
			formik.setFieldValue('Profesion', '');
		}
	};

	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';

	const formik = useFormik({
		initialValues,
		validationSchema: contactFormValidation,
		onSubmit: async (values) => {
			setOnRequest(true);
			let leadSource = null;
			if (submitReason) leadSource = submitReason;
			const body = {
				...values,
				leadSource,
			};
			if (executeRecaptcha) {
				try {
					body.recaptcha_token = await executeRecaptcha('contact_form');
					let response;
					switch (submitEndpoint) {
						case 'contact':
							response = await api.postContactUs(body);
							break;
						case 'newsletter':
							response = await api.postNewsletter(body as Newsletter);
							break;
					}
					// @ts-ignore
					if (response.data[0].code === 'SUCCESS') {
						// let routeChange = isEbook ? '/gracias?origen=descarga-ebook' : '/gracias?origen=contact';
						const routeChange = `${window.location.origin}${country ? `/${country}` : ''}/gracias?origen=${
							isEbook ? 'descarga-ebook' : 'contact'
						}`;

						setFormSent(true);
						resetForm();

						if (isEbook && typeof resourceMedia === 'string') {
							try {
								// Realiza la solicitud para obtener el archivo PDF
								// const replacedUrl = resourceMedia.replace(/^(https?:\/\/)(ar\.|mx\.|cl\.|ec\.)/, '$1');
								const replacedUrl = resourceMedia.replace(
									/^(https?:\/\/)(ar\.|bo\.|br\.|cl\.|co\.|cr\.|cu\.|do\.|ec\.|es\.|sv\.|gt\.|ht\.|hn\.|jm\.|mx\.|ni\.|pa\.|py\.|pe\.|pr\.|uy\.|ve\.)/,
									'$1',
								);
								// const response = await fetch(replacedUrl);

								// console.log(response);

								// if (!response.ok) {
								// 	throw new Error('No se pudo descargar el archivo PDF');
								// }

								// const blob = await response.blob();

								// Crea un enlace temporal y simula un clic para descargar el archivo con su nombre original
								const a = document.createElement('a');
								// a.href = typeof window !== 'undefined' ? window.URL.createObjectURL(blob) : '';
								a.href = replacedUrl;

								// Obtén el nombre del archivo del encabezado Content-Disposition si está presente
								// const contentDisposition = response.headers.get('Content-Disposition');
								// const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

								// if (fileNameMatch && fileNameMatch[1]) {
								// 	a.download = fileNameMatch[1];
								// } else {
								// 	// Si no se encontró el nombre del archivo en el encabezado, utiliza un nombre predeterminado
								// }

								a.download = `${resourcePDFName}.pdf`;
								// a.download = `descarga.pdf`;
								// console.log(a);
								// Simula un clic en el enlace para iniciar la descarga
								// a.click();

								window.open(replacedUrl, '_blank');

								// Libera el objeto URL creado
								if (typeof window !== 'undefined') window.URL.revokeObjectURL(a.href);

								if (!isDownload) {
									setTimeout(() => {
										// changeRoute(routeChange);
									}, 100);
								} else if (updateFormSent) {
									updateFormSent(true, body);
								}
							} catch (error) {
								console.error('Error al descargar el archivo:', error);
							}
						} else {
							if (!isDownload) {
								setTimeout(() => {
									// changeRoute(routeChange);
								}, 100);
							} else if (updateFormSent) {
								updateFormSent(true, body);
							}
						}
					} else {
						setFormError('Hubo un error al enviar el formulario, revise los campos');
					}
				} catch (error) {
					console.error('Error al ejecutar reCAPTCHA:', error);
				}
			} else {
				// console.log("Execute recaptcha not yet available1");
			}
			setOnRequest(false);
		},
	});

	const optionsArray = [1, 2, 3, 4, 5];

	// const handleContactPreferenceChange = (value: string) => {
	// 	formik.setFieldValue('Preferencia_de_contactaci_n', value);
	// };
	const requiredFormFields = [
		'First_Name',
		'Last_Name',
		'Email',
		'Phone',
		// 'Preferencia_de_contactaci_n',
		'Profesion',
		'Terms_And_Conditions',
	];

	const isSubmitDisabled = !formik.dirty || !isFormValid(requiredFormFields, formik.values, formik.errors, formik.touched);

	console.log(formik);

	return (
		<>
			<div className='col-span-3 ' id='contactanos'>
				<div className=''>
					<div className=''>
						<FormikProvider value={formik}>
							<Form onSubmit={formik.handleSubmit} action='/leads' className='' autoComplete='off' ref={formRef}>
								<input type='hidden' name='Cursos_consultados' id='Cursos_consultados' value={productName} />

								<input type='hidden' name='Ebook_consultado' id='Ebook_consultado' value={productName} />

								<input type='hidden' name='URL_ORIGEN' id='URL_ORIGEN' value={urlOrigen} />

								<input type='hidden' name='leadSource' id='leadSource' value={isEbook ? 'Descarga ebook' : ''} />

								{hideContactPreference ? null : (
									<div className={` mb-30`}>
										{hideHeader ? null : (
											<h4 className='font-medium text-violet-dark text-[36px] mb-1' style={{ maxWidth: '800px' }}>
												{isNosotros
													? '¿Te gustaría recibir asesoría académica?'
													: isEbook
													? 'Completa el formulario para descargar automáticamente el material'
													: 'Contáctanos'}
											</h4>
										)}

										{!isEbook && (
											<div className='flex flex-wrap gap-6 mt-6 mb-6 preferences'>
												{/* <p className='w-full md:w-auto'>Quiero hablar por</p>
												<div className='grid grid-cols-1 gap-4 mt-1 md:grid-cols-3'>
													{[
														{ value: 'phone', label: 'Teléfono' },
														{ value: 'whatsapp', label: 'WhatsApp' },
														{ value: 'email', label: 'E-mail' },
													].map((option) => (
														<label key={option.value} className='flex items-center gap-2 cursor-pointer'>
															<input
																type='radio'
																name='Preferencia_de_contactaci_n'
																value={option.value}
																checked={formik.values.Preferencia_de_contactaci_n === option.value}
																onChange={() => handleContactPreferenceChange(option.value)}
																className='accent-[#9200AD] text-[#9200AD] ring-[#9200AD] w-5 h-5'
															/>
															<span className='text-sm'>{option.label}</span>
														</label>
													))}
												</div> */}
											</div>
										)}
									</div>
								)}

								<div className={`grid md:grid-cols-1  gap-4 ${hideSideInfo ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
									<div className='grid w-full grid-cols-1 col-span-2 gap-4 md:grid-cols-2'>
										<div className='col-span-2 col-xl-6 md:col-span-1'>
											<div className='rounded-xl'>
												<ErrorMessage name='First_Name' component='span' className='text-red-500' />
												<Field
													className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
													type='text'
													name='First_Name'
													placeholder='Ingresar nombre'
												/>
											</div>
										</div>
										<div className='col-span-2 col-xl-6 md:col-span-1'>
											<div className='contact-from-input'>
												<ErrorMessage className='text-red-500' name='Last_Name' component='span' />
												<Field
													className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
													type='text'
													name='Last_Name'
													placeholder='Ingresar apellido'
												/>
											</div>
										</div>

										<div className='col-span-2 border-none col-xl-6 md:col-span-1'>
											<div className='border-none contact-from-input intl-input phone-contact-input-select'>
												<Field name='phone'>
													{({ field, form }: any) => (
														<>
															<div className='flex mt-1 w-full rounded-2xl border border-gray-300  focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c]  py-1.5 '>
																<CountrySelect onChange={(code) => formik.setFieldValue('areaCode', code)} />

																<input
																	{...field}
																	type='tel'
																	onChange={(e) => {
																		const onlyNumbers = e.target.value.replace(/\D/g, '');
																		form.setFieldValue('Phone', onlyNumbers);
																	}}
																	placeholder='Ingresar número telefónico'
																	className='p-0 border-none'
																/>
															</div>
														</>
													)}
												</Field>
											</div>
										</div>

										<div className='col-span-2 col-xl-6 md:col-span-1'>
											<div className='contact-from-input'>
												<ErrorMessage name='Email' component='span' className='text-red-500' />
												<Field
													className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
													type='email'
													name='Email'
													placeholder='Ingresar e-mail'
												/>
											</div>
										</div>

										<div className='w-full col-span-2 col-xl-6 md:col-span-1'>
											<div className=''>
												<ErrorMessage name='Profesion' component='span' className='text-red-500' />
												<Field
													className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
													as='select'
													name='Profesion'
													onChange={handleOptionProfessionChange}
													value={`${selectedOptionProfession}/${selectedProfessionId}`}
												>
													<option defaultValue='' value=''>
														Seleccionar profesión
													</option>
													{professions && professions.length
														? professions.map((p) => (
																<option key={p.id} value={`${p.name}/${p.id}`}>
																	{p.name}
																</option>
														  ))
														: ''}
												</Field>
											</div>

											{showInputProfession && (
												<div className='my-4 contact-from-input'>
													<ErrorMessage name='Otra_profesion' component='span' className='text-red-500' />
													<Field
														className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
														type='text'
														name='Otra_profesion'
														placeholder='Ingresar profesion'
													/>
												</div>
											)}
										</div>

										{studentInputs ? (
											<div className='flex gap-2 col-xl-12'>
												<div className='w-1/2 contact-select'>
													<ErrorMessage name='year' component='span' className='text-red-500' />
													<Field
														as='select'
														name='year'
														className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
													>
														<option defaultValue=''>Año</option>
														{optionsArray.map((y) => (
															<option key={`st_year_${y}`} defaultValue={y}>
																{y}
															</option>
														))}
													</Field>
												</div>
												<div className='w-full contact-select'>
													<ErrorMessage name='career' component='span' className='text-red-500' />
													<Field
														className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
														as='select'
														name='career'
														onChange={handleOptionCareerChange}
														value={selectedCareer}
													>
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
												<div className={`col-xl-6 col-span-2 sm:col-span-1`}>
													<div className='contact-select'>
														<ErrorMessage name='Especialidad' component='span' className='text-red-500' />
														<Field
															className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
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
																: specialties?.map((s) => (
																		<option key={`sp_${s.id}`} defaultValue={s.name}>
																			{s.name}
																		</option>
																  ))}
														</Field>
													</div>
													{showInputSpecialties && (
														<div className='my-4 contact-from-input'>
															<Field
																className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
																type='text'
																name='Otra_especialidad'
																placeholder='Ingresar especialidad'
															/>
															<ErrorMessage name='Otra_especialidad' component='div' className='text-red-500' />
														</div>
													)}
												</div>
											</>
										)}
										<div className='col-span-2'>
											{!isEbook && (
												<div className='mt-4 col-xl-12'>
													<div className='contact-from-input'>
														<ErrorMessage name='Description' component='span' className='text-red-500' />
														<Field
															className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5 resize-none min-h-[150px]'
															as='textarea'
															id='Description'
															name='Description'
															placeholder='Mensaje'
														/>
													</div>
												</div>
											)}

											<div className='flex justify-between mt-8'>
												<div className='flex flex-wrap justify-center gap-1 mt-2 mb-4 sm:justify-start'>
													<div className='contact-checkbox'>
														<ErrorMessage name='Terms_And_Conditions' component='div' className='text-red-500' />
														<div className='flex gap-2 center'>
															<Field
																type='checkbox'
																name='Terms_And_Conditions'
																checked={formik.values.Terms_And_Conditions}
																className='mt-1 hidden-checkbox'
															/>
															<label>
																Acepto las{' '}
																<Link
																	href={
																		country === ''
																			? `${window.location.origin}/politica-de-privacidad`
																			: `${window.location.origin}/${country}/politica-de-privacidad`
																	}
																	target='_blank'
																	className='underline text-[#9200AD] '
																>
																	condiciones de privacidad
																</Link>
															</label>
														</div>
													</div>
												</div>

												<div className='mt-2 col-xl-2'>
													<div className=''>
														<button
															type='submit'
															className='px-6 py-3 rounded-full bg-[#9200AD] text-white'
															disabled={isSubmitDisabled || onRequest}
														>
															{onRequest ? 'Enviando ...' : submitText}
														</button>
													</div>
												</div>
											</div>
											<ShowErrorMessage text={formError} visible={formError !== ''} />
											<p
												className='success-message'
												style={{
													visibility: formSent ? 'visible' : 'hidden',
												}}
											>
												¡Gracias! Tu mensaje fue enviado correctamente.
											</p>
										</div>
									</div>
									{/* {hideSideInfo ? null : (
										<div className='col-span-2 md:col-span-1'>
											<ContactSidebar />
										</div>
									)} */}
								</div>
							</Form>
						</FormikProvider>
					</div>
				</div>
			</div>
		</>
	);
};
export default ContactForm;

import { isNull } from 'lodash';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface CurrentCourseType {
	id: any;
	image: any;
	title: any;
	crm_id: any;
	completed_percentage: any;
}

export async function GET() {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;
	const profileImage = cookies().get('picture')?.value;

	if (!token || !email) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	try {
		// Primer fetch: perfil básico
		const profileRes = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/profile/${email}`, {
			headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		});

		if (!profileRes.ok) throw new Error('Error fetching profile');

		const profileData = await profileRes.json();
		const entityIdCrm = profileData.user.contact.entity_id_crm;

		// Segundo fetch: contacto extendido
		const contactoRes = await fetch(`https://api.msklatam.net/getContactoByID?id=${entityIdCrm}`, {
			headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		});

		if (!contactoRes.ok) throw new Error('Error fetching contacto');

		const contactoData = await contactoRes.json();

		/* calcular el porcentaje de perfil */
		const profileCompletion = {
			percentage: 25,
			message: '¿Por qué completar tu perfil?',
			ctaText: 'Entérate aquí',
			ctaLink: '/dashboard/profile',
		};

		/* To Do
Anotación importante
Description
La barra de progreso tendrá encuenta las siguientes reglas para su llenado: Si solo hizo registro simple: 25%
- Si completó hasta profesión, especialidad, país y teléfono: 50%
- Si completó hasta institución y área de trabajo: 75%
- Si avanzó hasta intereses, como la única opción es guardar: la barra (100%) se elimina y pasamos al perfil completo. */

		// Armo el DTO (objeto limpio final)
		const user = {
			profileCompletion: profileCompletion,
			profileImage: profileImage || isNull,
			name: profileData.user.contact.name,
			lastName: profileData.user.contact.last_name,
			profession: profileData.user.contact.profession,
			speciality: profileData.user.contact.speciality,
			email: profileData.user.contact.email,
			country: profileData.user.contact.country,
			phone: profileData.user.contact.phone,
			contracts: profileData.user.contact.contracts,
			coursesInProgress: contactoData.contacto.Formulario_de_cursada,
			asosiacion: contactoData.contacto.Colegio_Sociedad_o_Federaci_n[0],
			placeOfWork: contactoData.contacto.Lugar_de_trabajo,
			intereses: contactoData.contacto.Temas_de_interes,
			interesesAdicionales: contactoData.contacto.Intereses_adicionales,
			currentCourse: null as CurrentCourseType | null,
			recommendedResourcesByInterests: [] as any[],
			crm_id: profileData.user?.contact?.entity_id_crm || contactoData.contacto.id,
			// podes agregar mas campos si necesitás
		};

		const profileCourses = profileData.user.contact.courses_progress;

		// Calculate profile completion percentage based on filled fields
		const calculateProfileCompletion = () => {
			let percentage = 25; // Base percentage for simple registration
			if (user.profession && user.speciality && user.country && user.phone) {
				percentage += 25;
			}
			// Note: area of work is missing from server data
			if (user.placeOfWork) {
				percentage += 25;
			}
			if (user.intereses) {
				percentage += 25;
			}
			return percentage;
		};

		const getCurrentCourse = async () => {
			if (!user.coursesInProgress || user.coursesInProgress.length === 0) {
				return null;
			}
			const activeCourses = user.coursesInProgress.filter((course: any) => course.Fecha_finalizaci_n === null);
			if (activeCourses.length === 0) {
				return null;
			}
			const latestCourse = activeCourses.reduce((latest: any, course: any) => {
				const latestDate = latest ? new Date(latest.Fecha_de_ltima_sesi_n).getTime() : 0;
				const courseDate = new Date(course.Fecha_de_ltima_sesi_n).getTime();
				return courseDate > latestDate ? course : latest;
			}, null);

			const courseToEnroll = profileCourses.find((profCourse: any) => profCourse.entity_id_crm == latestCourse.id);

			const courseRes = await fetch(
				`https://cms1.msklatam.com/wp-json/msk/v1/products?search=${latestCourse.Nombre_de_curso.name}`,
				{
					headers: { Accept: 'application/json' },
				},
			);

			const courseData = await courseRes.json();

			if (courseData.data.length === 0) {
				return null;
			}

			const latestCourseData = {
				product_code: courseToEnroll.Product_Code,
				product_code_cedente: courseToEnroll.C_digo_de_Curso_Cedente,
				id: courseData.data[0].id,
				image: courseData.data[0].featured_images,
				title: courseData.data[0].title,
				crm_id: latestCourse.Nombre_de_curso.id,
				completed_percentage: parseInt(latestCourse.Avance.toString().replace(',', '.')),
			};

			return latestCourseData;
		};

		const getRecommendedResourcesByInterests = async () => {
			const recommendedResources: any[] = [];

			/* si no tiene intereses, no devuelve nada */
			if (!user.intereses || user.intereses.length === 0) {
				return recommendedResources;
			}

			/* si tiene intereses, devuelve los recursos recomendados. Para esto vamos a usar la API de CMS */
			/* solo necesito 4 cursos, asi que si tiene mas de 4 intereses, usar los primeros 4 */
			const interestsToUse = user.intereses.slice(0, 4);
			for (const interest of interestsToUse) {
				const slugifiedInterest = interest.toLowerCase().replace(/ /g, '-');
				const resourceRes = await fetch(
					`https://cms1.msklatam.com/wp-json/msk/v1/products?lang=int&specialty=${slugifiedInterest}&resource=course`,
					{
						headers: { Accept: 'application/json' },
						next: { revalidate: 3600 * 7 }, // Cache for 7 hours
					},
				);
				const resourceData = await resourceRes.json();
				recommendedResources.push(resourceData.data[0]);
			}
			return recommendedResources;
		};

		const fetchCourseImage = async (courseName: string) => {
			try {
				// Use cache to reduce API calls
				const imageRes = await fetch(
					`https://cms1.msklatam.com/wp-json/msk/v1/course-image?name=${encodeURIComponent(courseName)}`,
					{
						headers: { Accept: 'application/json' },
						next: { revalidate: 3600 * 7 }, // Cache for 7 hours
					},
				);

				if (!imageRes.ok) {
					console.error(`Failed to fetch image for course: ${courseName}`);
					return null;
				}

				// Parse the response and clean the URL
				const imageData = await imageRes.text();
				// Remove the surrounding quotes that are coming in the response
				return imageData.trim().replace(/^"|"$/g, '');
			} catch (error) {
				console.error(`Error fetching image for course: ${courseName}`, error);
				return null;
			}
		};

		user.coursesInProgress.forEach(async (course: any) => {
			if (course.Nombre_de_curso && course.Nombre_de_curso.name) {
				course.image = await fetchCourseImage(course.Nombre_de_curso.name);
			}

			const courseToEnroll = profileCourses.find((profCourse: any) => profCourse.entity_id_crm == course.id);

			course.product_code = courseToEnroll.Product_Code;
			course.product_code_cedente = courseToEnroll.C_digo_de_Curso_Cedente;
			course.id = course.Nombre_de_curso.id;
			course.status = course.Estado_cursada === 'Finalizado' ? 'finished' : 'progress';
			course.title = course.Nombre_de_curso.name;
			course.expiryDate = course.Fecha_de_expiraci_n;
			course.qualification = course.Nota_final;
			course.statusType = course.Estado_cursada;
			course.statusText =
				course.Estado_cursada === 'Finalizado'
					? 'Finalizado'
					: course.Estado_cursada === 'Expirado'
					? 'Expirado'
					: course.Estado_cursada === 'Activo'
					? `${parseInt(course.Avance.toString().replace(',', '.')) ?? 0}% completado`
					: `${parseInt(course.Avance.toString().replace(',', '.')) ?? 0}% completado`;
		});

		user.profileCompletion.percentage = calculateProfileCompletion();
		user.currentCourse = await getCurrentCourse();
		user.recommendedResourcesByInterests = await getRecommendedResourcesByInterests();
		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ user: null }, { status: 500 });
	}
}

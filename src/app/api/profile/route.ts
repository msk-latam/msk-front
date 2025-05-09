import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface CurrentCourseType {
	id: any; // CMS ID of the course
	image: any;
	title: any;
	crm_id: any; // CRM ID of the course (e.g., product_code or similar unique course identifier from CRM/LMS)
	completed_percentage: any;
	product_code: any;
	product_code_cedente: any;
	resource: any;
}

// Define new interfaces for the API response
interface CustomerApiResponse {
	id: number;
	entity_id_crm: string;
	school_name: string | null;
	school_associate: boolean | null;
	canton_place: string | null;
	parish_place: string | null;
	identification?: string;
	first_name: string;
	last_name: string;
	profession: string | null;
	specialty: string | null;
	workplace: string | null;
	work_area: string | null;
	user_id: number;
	fiscal_regime: string | null;
	phone: string | null;
	email: string;
	sex: string | null;
	date_of_birth: string | null;
	country: string | null;
	postal_code: string | null;
	address: string | null;
	created_at: string;
	updated_at: string;
	validate: string;
	other_profession: string | null;
	tax_regime: string | null;
	other_speciality: string | null;
	state: string | null;
	career: string | null;
	year: string | null;
	company_name: string | null;
	document_type: string | null;
	billing_email: string | null;
	billing_phone: string | null;
	invoice_required: number | null;
	interests: {
		specialty_interests: string[] | null;
		content_interests: string[] | null;
		other_interests: string[] | null;
	} | null;
	contracts: Contract[];
	course_progress: CourseProgress[];
}

interface Contract {
	id: number;
	contact_id: number;
	installments: any | null;
	entity_id_crm: string;
	so_crm: string;
	status: string;
	status_payment: string;
	country: string;
	currency: string;
	Comprobante_Factura: any | null;
	Fecha_Cobro: string | null;
	Monto: string | null;
	products: Product[];
}

interface Product {
	id: number;
	contract_id: number;
	contract_entity_id: string;
	entity_id_crm: string;
	quantity: number;
	product_code: number | string;
	price: string;
	discount: string;
	created_at: string;
	updated_at: string;
}

interface CourseProgress {
	course_name: string;
	product_code: number | string;
	score: string | null;
	end_date: string | null;
	advance: string;
	certification: string | null;
	contract_status: string;
	deadline_enroll: string | null;
	diploma: string | null;
	enroll: string | null;
	enroll_platform: string;
	enroll_status: string; // "Activo", "Finalizado", "Expirado"
	expiration_date: string | null;
	field_status: string | null;
	last_session_date: string | null;
	shop_date: string | null;
	transferor_course_code: string | null;
	entity_id_crm: string; // CRM ID of the course_progress record
	parent_id: string;
	created_time: string;
}

export async function GET() {
	const token = cookies().get('access_token')?.value;
	const email = cookies().get('email')?.value;
	const profileImage = cookies().get('picture')?.value;

	/* remove redirectToDashboard cookie */
	cookies().delete('redirectToDashboard');

	if (!token || !email) {
		console.log('No token or email');
		cookies().delete('access_token');
		cookies().delete('email');
		cookies().delete('picture');
		return NextResponse.json({ user: null }, { status: 401 });
	}

	try {
		const customerRes = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/customer/${email}`, {
			headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
		});

		if (!customerRes.ok) {
			const errorBody = await customerRes.text();
			console.error('Error fetching customer data:', customerRes.status, errorBody);
			// Clear cookies on critical API failure to force re-login
			cookies().delete('access_token');
			cookies().delete('email');
			cookies().delete('picture');
			return NextResponse.json(
				{ user: null, error: `Failed to fetch customer data: ${customerRes.status}` },
				{ status: customerRes.status },
			);
		}

		const customerData: CustomerApiResponse = await customerRes.json();

		// Fetch additional contact information for course recommendations
		let courseRecommendationsList: string[] = [];
		if (customerData.entity_id_crm) {
			try {
				const contactoRes = await fetch(`https://api.msklatam.net/getContactoByID?id=${customerData.entity_id_crm}`, {
					headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
					next: { revalidate: 3600 * 1 }, // Cache for 1 hour, adjust as needed
				});

				if (contactoRes.ok) {
					const contactoData = await contactoRes.json();
					const rawRecommendations = contactoData?.contacto?.Recomendador_web;
					if (typeof rawRecommendations === 'string') {
						courseRecommendationsList = rawRecommendations
							.split(',')
							.map((item: string) => item.trim())
							.filter((item: string) => item);
					}
				} else {
					console.warn(`Failed to fetch contacto data for ${customerData.entity_id_crm}: ${contactoRes.status}`);
				}
			} catch (error) {
				console.error(`Error fetching contacto data for ${customerData.entity_id_crm}:`, error);
			}
		}

		// Fetch full details for recommended courses
		let detailedRecommendedCourses: any[] = [];
		if (courseRecommendationsList.length > 0) {
			detailedRecommendedCourses = await Promise.all(
				courseRecommendationsList.slice(0, 4).map(async (courseIdentifier: string) => {
					try {
						const resourceRes = await fetch(
							`https://cms1.msklatam.com/wp-json/msk/v1/product/${encodeURIComponent(courseIdentifier)}`,
							{
								headers: { Accept: 'application/json' },
								next: { revalidate: 3600 * 7 }, // Cache for 7 hours
							},
						);
						if (resourceRes.ok) {
							const resourceData = await resourceRes.json();
							if (resourceData && resourceData.id != null) {
								return resourceData;
							}
						} else {
							console.warn(`Failed to fetch product details for ${courseIdentifier}: ${resourceRes.status}`);
						}
					} catch (error) {
						console.error(`Error fetching product details for ${courseIdentifier}:`, error);
					}
					return null; // Return null for failed fetches or invalid data
				}),
			);
			detailedRecommendedCourses = detailedRecommendedCourses.filter((course) => course !== null); // Filter out nulls
		}

		const fetchCourseImage = async (courseName: string) => {
			try {
				const imageRes = await fetch(
					`https://cms1.msklatam.com/wp-json/msk/v1/course-image?name=${encodeURIComponent(courseName)}`,
					{
						headers: { Accept: 'application/json' },
						next: { revalidate: 3600 * 7 }, // Cache for 7 hours
					},
				);

				if (!imageRes.ok) {
					console.error(`Failed to fetch image for course: ${courseName}, status: ${imageRes.status}`);
					return null;
				}
				const imageData = await imageRes.text();
				return imageData.trim().replace(/^"|"$/g, '');
			} catch (error) {
				console.error(`Error fetching image for course: ${courseName}`, error);
				return null;
			}
		};

		const calculateProfileCompletion = (
			profession: string | null | undefined,
			specialty: string | null | undefined,
			country: string | null | undefined,
			phone: string | null | undefined,
			workplace: string | null | undefined,
			workArea: string | null | undefined,
			apiInterests: CustomerApiResponse['interests'] | undefined,
		) => {
			let percentage = 25; // Base percentage for simple registration

			// Rule 2: Profession, specialty, country, and phone completed
			if (profession && specialty && country && phone) {
				percentage = 50;

				// Rule 3: Institution (workplace) and work area completed (cumulative)
				if (workplace && workArea) {
					percentage = 75;

					// Rule 4: Interests completed (cumulative)
					const hasInterests =
						apiInterests &&
						(apiInterests.specialty_interests?.length ||
							apiInterests.content_interests?.length ||
							apiInterests.other_interests?.length);
					if (hasInterests) {
						percentage = 100;
					}
				}
			}
			return percentage;
		};

		const getCurrentCourse = async (rawCourseProgress: CourseProgress[] | undefined): Promise<CurrentCourseType | null> => {
			if (!rawCourseProgress || rawCourseProgress.length === 0) {
				return null;
			}

			const activeProgressList = rawCourseProgress.filter(
				(course: CourseProgress) => course.end_date === null && course.enroll_status === 'Activo',
			);

			if (activeProgressList.length === 0) {
				return null;
			}

			const latestCourseProgress =
				activeProgressList.length === 1
					? activeProgressList[0]
					: activeProgressList.reduce((latest: CourseProgress, current: CourseProgress) => {
							const latestDate = latest.last_session_date ? new Date(latest.last_session_date).getTime() : 0;
							const currentDate = current.last_session_date ? new Date(current.last_session_date).getTime() : 0;
							return currentDate > latestDate ? current : latest;
					  });

			if (!latestCourseProgress) {
				// Should be unreachable if activeProgressList has items
				return null;
			}

			try {
				const courseCmsRes = await fetch(
					`https://cms1.msklatam.com/wp-json/msk/v1/products?search=${encodeURIComponent(latestCourseProgress.course_name)}`,
					{
						headers: { Accept: 'application/json' },
						next: { revalidate: 3600 * 7 },
					},
				);

				if (!courseCmsRes.ok) {
					console.error(`CMS fetch failed for current course ${latestCourseProgress.course_name}: ${courseCmsRes.status}`);
					return null;
				}
				const courseCmsData = await courseCmsRes.json();

				if (!courseCmsData || !courseCmsData.data || courseCmsData.data.length === 0) {
					console.warn(`No CMS data found for current course: ${latestCourseProgress.course_name}`);
					return null;
				}

				const cmsCourseDetail = courseCmsData.data[0];

				return {
					product_code: latestCourseProgress.product_code,
					product_code_cedente: latestCourseProgress.transferor_course_code,
					id: cmsCourseDetail?.id, // CMS ID
					image: cmsCourseDetail?.featured_images,
					title: cmsCourseDetail?.title || latestCourseProgress.course_name,
					crm_id: latestCourseProgress.product_code, // Using product_code as CRM identifier for the course
					completed_percentage: parseFloat(latestCourseProgress.advance?.replace(',', '.')) || 0,
					resource: cmsCourseDetail?.resource,
				};
			} catch (cmsError) {
				console.error(`Error fetching CMS details for current course ${latestCourseProgress.course_name}:`, cmsError);
				return null;
			}
		};

		// This function is kept for structure but will return empty as `courseRecommendations` source is removed.
		// const getRecommendedResourcesByInterests = async (
		// 	_courseRecommendations: string[], // This will be an empty array
		// ): Promise<any[]> => {
		// 	return [];
		// };

		// Process courses in parallel and wait for all to complete
		const processedCoursesInProgress = await Promise.all(
			(customerData.course_progress || []).map(async (cp: CourseProgress) => {
				const advanceNumeric = parseFloat(cp.advance?.replace(',', '.')) || 0;
				let statusText = cp.enroll_status;
				if (cp.enroll_status === 'Activo') {
					statusText = `${advanceNumeric}% completado`;
				}

				return {
					image: await fetchCourseImage(cp.course_name),
					product_code: cp.product_code,
					product_code_cedente: cp.transferor_course_code,
					id: cp.entity_id_crm, // Using the CRM ID of the progress record itself
					status: cp.end_date != null || cp.enroll_status === 'Finalizado' ? 'finished' : 'progress',
					title: cp.course_name,
					expiryDate: cp.expiration_date || cp.deadline_enroll,
					qualification: cp.score,
					statusType: cp.enroll_status,
					statusText: statusText,
					// Keep original data if frontend needs it, or for debugging
					_original_advance: cp.advance,
					_original_entity_id_crm: cp.entity_id_crm,
					_original_enroll_status: cp.enroll_status,
					_original_last_session_date: cp.last_session_date,
					_original_end_date: cp.end_date,
				};
			}),
		);

		const currentCourseData = await getCurrentCourse(customerData.course_progress);
		// const recommendedResourcesData = await getRecommendedResourcesByInterests([]); // Will be empty

		let combinedInterests: string[] = [];
		if (customerData.interests) {
			if (customerData.interests.specialty_interests) {
				combinedInterests = combinedInterests.concat(
					customerData.interests.specialty_interests.filter((i) => i !== null) as string[],
				);
			}
			if (customerData.interests.content_interests) {
				combinedInterests = combinedInterests.concat(
					customerData.interests.content_interests.filter((i) => i !== null) as string[],
				);
			}
			if (customerData.interests.other_interests) {
				combinedInterests = combinedInterests.concat(
					customerData.interests.other_interests.filter((i) => i !== null) as string[],
				);
			}
		}

		const user = {
			profileCompletion: {
				percentage: calculateProfileCompletion(
					customerData.profession,
					customerData.specialty,
					customerData.country,
					customerData.phone,
					customerData.workplace,
					customerData.work_area,
					customerData.interests,
				),

				message: '¿Por qué completar tu perfil?',
				ctaText: 'Entérate aquí',
				ctaLink: '/dashboard/profile',
			},
			profileImage: profileImage || null,
			identification: customerData.identification,
			name: customerData.first_name,
			lastName: customerData.last_name,
			profession: customerData.profession,
			speciality: customerData.specialty,
			workplace: customerData.workplace,
			workArea: customerData.work_area,
			school_name: customerData.school_name,
			schoolAssociate: customerData.school_associate,
			cantonPlace: customerData.canton_place,
			parishPlace: customerData.parish_place,
			email: customerData.email, // Using email from the new API as authoritative
			country: customerData.country,
			phone: customerData.phone,
			contracts: customerData.contracts || [],
			coursesInProgress: processedCoursesInProgress,
			company_name: customerData.company_name,
			document_type: customerData.document_type,
			documentNumber: customerData.identification,
			taxRegime: customerData.tax_regime,

			invoice_required: customerData.invoice_required,
			billingEmail: customerData.billing_email,
			billingPhone: customerData.billing_phone || '',
			intereses: combinedInterests,
			interesesAdicionales: null, // Data not available in new API
			currentCourse: currentCourseData,
			recommendedResourcesByIA: detailedRecommendedCourses, // Use the fetched detailed recommendations
			crm_id: customerData.entity_id_crm, // Main CRM ID for the contact
			courseRecommendations: detailedRecommendedCourses, // Update with fetched detailed recommendations
		};

		// Helper to parse school_name
		let finalSchoolName = customerData.school_name;
		if (
			typeof customerData.school_name === 'string' &&
			customerData.school_name.startsWith('[') &&
			customerData.school_name.endsWith('"]')
		) {
			try {
				const parsedArray = JSON.parse(customerData.school_name);
				if (Array.isArray(parsedArray) && parsedArray.length > 0) {
					finalSchoolName = parsedArray[0];
				}
			} catch (e) {
				console.error('Error parsing school_name:', e);
				// Keep original value if parsing fails
			}
		}
		user.school_name = finalSchoolName;

		return NextResponse.json({ user });
	} catch (error) {
		console.error('Error in profile GET route:', error);
		// Ensure cookies are cleared on unhandled errors during profile fetch process as well
		cookies().delete('access_token');
		cookies().delete('email');
		cookies().delete('picture');
		return NextResponse.json({ user: null, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
	}
}

import { incompleteUserData } from '@/modules/dashboard/data/incompleteProfileMock'; // Corrected path and extension

const USER_DATA_KEY = 'userData';

// Define the structure for user data, including the optional profileCompletion
// We can base this on the structure implicitly defined by the mock data and component usage
export interface UserDetail {
	label: string;
	value: string;
	placeholder: string;
}

export interface ProfileCompletion {
	percentage: number;
	message: string;
	ctaText: string;
	ctaLink: string;
}

// Define the full UserData interface based on previous usage and mock data
export interface UserData {
	email: string;
	password: string;
	profileImage: string;
	firstName?: string;
	lastName?: string;
	specialty: string;
	profesion?: string;
	workplace?: string;
	workArea?: string;
	country?: string;
	phone?: string;
	phoneCode?: string;
	belongsToMedicalCollege?: boolean | null;
	medicalCollegeName?: string;
	details: UserDetail[];
	profileCompletion?: ProfileCompletion | null;
	interests?: string[];
	fullPhoneNumber?: string;
	currentCourse: {
		image: string;
		label: string;
		title: string;
		progress: string;
	};
	recommendedResources: {
		image: string;
		title: string;
		author: string;
		tags: string[];
		buttonText: string;
		buttonLink: string;
	}[];
	// Add other fields if necessary, e.g., helpSection
}

// Helper to get default data, merging incomplete with necessary structures
const getDefaultData = (): UserData => {
	const baseDefaults: Omit<UserData, 'profileCompletion' | 'recommendedResources' | 'currentCourse'> & {
		currentCourse?: Partial<UserData['currentCourse']>;
		recommendedResources?: UserData['recommendedResources'];
		interests: [];
		fullPhoneNumber: '';
	} = {
		email: '',
		password: '',
		profileImage: '/default-avatar.png',
		firstName: '',
		lastName: '',
		specialty: '',
		profesion: '',
		details: [
			{ label: 'Email', value: '', placeholder: 'Añadir email' },
			{ label: 'Teléfono', value: '', placeholder: 'Añadir teléfono' },
		],
		interests: [],
		fullPhoneNumber: '',
		// Make course/resources optional here to align with potential partial mock data
	};

	// Explicitly define the structure we expect from incompleteUserData or provide fallbacks
	const mockData = {
		profileImage: incompleteUserData.profileImage || baseDefaults.profileImage,
		firstName: (incompleteUserData as any).name?.split(' ')[0] || baseDefaults.firstName,
		lastName: (incompleteUserData as any).name?.split(' ')[1] || baseDefaults.lastName,
		specialty: incompleteUserData.specialty || baseDefaults.specialty,
		profesion: (incompleteUserData as any).profession || baseDefaults.profesion,
		details: incompleteUserData.details?.length ? incompleteUserData.details : baseDefaults.details,
		interests: incompleteUserData.interests?.length ? incompleteUserData.interests : baseDefaults.interests,
		// Safely access potentially missing fields in the mock
		currentCourse: incompleteUserData.currentCourse || {
			image: '/placeholder-course.jpg',
			label: 'Aprendizaje',
			title: 'Completa tu perfil para ver cursos',
			progress: '0%',
		},
		recommendedResources:
			'recommendedResources' in incompleteUserData && Array.isArray(incompleteUserData.recommendedResources)
				? incompleteUserData.recommendedResources
				: [],
		profileCompletion: null, // Start as null, calculate later
		email: baseDefaults.email,
		password: baseDefaults.password,
	};

	return mockData as UserData; // Assert type after constructing the full object
};

// Function to get user data from localStorage
export const getUserData = (): UserData => {
	if (typeof window !== 'undefined') {
		const storedData = localStorage.getItem(USER_DATA_KEY);
		if (storedData) {
			try {
				let parsedData = JSON.parse(storedData) as Partial<UserData>; // Parse as partial first

				// Get default data structure
				const defaultData = getDefaultData();

				// Merge parsed data with defaults to ensure all keys exist
				parsedData = {
					...defaultData,
					...parsedData,
					// Ensure arrays are not overwritten by potentially null/undefined parsed values
					details: parsedData.details ?? defaultData.details,
					interests: parsedData.interests ?? defaultData.interests,
					recommendedResources: parsedData.recommendedResources ?? defaultData.recommendedResources,
					// Ensure objects are handled
					currentCourse: { ...defaultData.currentCourse, ...(parsedData.currentCourse ?? {}) },
				};

				// Calculate completion if it wasn't stored or is invalid
				if (parsedData.profileCompletion === undefined || parsedData.profileCompletion === null) {
					parsedData.profileCompletion = calculateProfileCompletion(parsedData as UserData);
				}

				return parsedData as UserData; // Now safe to assert UserData
			} catch (error) {
				console.error('Error parsing or merging user data from localStorage:', error);
				// Fallback to fresh default data if parsing/merging fails
				const freshDefaultData = getDefaultData();
				freshDefaultData.profileCompletion = calculateProfileCompletion(freshDefaultData);
				localStorage.setItem(USER_DATA_KEY, JSON.stringify(freshDefaultData));
				return freshDefaultData;
			}
		} else {
			// Initialize with default data if nothing is stored
			const initialDefaultData = getDefaultData();
			initialDefaultData.profileCompletion = calculateProfileCompletion(initialDefaultData);
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(initialDefaultData));
			return initialDefaultData;
		}
	}
	// Return default data during SSR or if window is not available
	const ssrDefaultData = getDefaultData();
	ssrDefaultData.profileCompletion = calculateProfileCompletion(ssrDefaultData);
	return ssrDefaultData;
};

// Function to save user data to localStorage
export const saveUserData = (data: UserData): void => {
	if (typeof window !== 'undefined') {
		try {
			// Ensure profileCompletion is calculated before saving
			const dataToSave: UserData = {
				...data,
				profileCompletion: calculateProfileCompletion(data),
			};
			// Clean up potential undefined/null values if necessary before stringifying
			localStorage.setItem(USER_DATA_KEY, JSON.stringify(dataToSave));
		} catch (error) {
			console.error('Error saving user data to localStorage:', error);
		}
	}
};

// Function to update parts of the user data
export const updateUserData = (partialData: Partial<UserData>): UserData => {
	const currentData = getUserData();
	// More robust merge, especially for nested objects/arrays if needed
	// Simple spread might be okay if partialData only contains top-level fields
	const updatedData = { ...currentData, ...partialData };
	saveUserData(updatedData); // saveUserData recalculates completion
	// Need to return the *actual* data read back after saving, including new completion status
	return getUserData();
};

// Function to check if profile is complete (example)
export const isProfileComplete = (data: UserData): boolean => {
	const completion = calculateProfileCompletion(data);
	return completion === null; // Profile is complete if calculation returns null (100%)
};

// Function to calculate profile completion percentage
export const calculateProfileCompletion = (data: UserData): ProfileCompletion | null => {
	let completedFields = 0;
	let totalFields = 0;

	// Ensure data and details exist before mapping
	const detailChecks = Array.isArray(data.details)
		? data.details.map((d) => ({ key: `detail_${d.label}`, hasValue: !isEmpty(d.value) }))
		: [];
	const interestCheck = { key: 'interests', hasValue: Array.isArray(data.interests) && data.interests.length > 0 };

	// Define fields to check for completion
	const fieldsToCheck = [
		{ key: 'firstName', hasValue: !isEmpty(data.firstName) },
		{ key: 'lastName', hasValue: !isEmpty(data.lastName) },
		{ key: 'specialty', hasValue: !isEmpty(data.specialty) },
		{ key: 'profesion', hasValue: !isEmpty(data.profesion) },
		{ key: 'country', hasValue: !isEmpty(data.country) },
		{ key: 'fullPhoneNumber', hasValue: !!data.fullPhoneNumber && data.fullPhoneNumber.length > 5 },
		...detailChecks,
		interestCheck,
		{ key: 'workplace', hasValue: !isEmpty(data.workplace) },
		{ key: 'workArea', hasValue: !isEmpty(data.workArea) },
		// { key: 'profileImage', hasValue: data.profileImage && data.profileImage !== '/default-avatar.png' } // Optional: Check if image is default
	];

	totalFields = fieldsToCheck.length;
	completedFields = fieldsToCheck.filter((f) => f.hasValue).length;

	const rawPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0;

	// NEW LOGIC based on completion rules
	let displayPercentage: number;
	let isComplete = false;

	const hasBasicInfo = !isEmpty(data.firstName) && !isEmpty(data.lastName);
	const hasContactInfo = !isEmpty(data.email) && !!data.fullPhoneNumber && data.fullPhoneNumber.length > 5;
	const hasProfessionalInfo = !isEmpty(data.profesion) && !isEmpty(data.specialty) && !isEmpty(data.country);
	const hasWorkInfo = !isEmpty(data.workplace) && !isEmpty(data.workArea);
	const hasInterests = Array.isArray(data.interests) && data.interests.length > 0;

	if (hasInterests) {
		// Interests are the last step, profile is 100% complete
		isComplete = true;
		displayPercentage = 100;
	} else if (hasWorkInfo && hasProfessionalInfo && hasContactInfo && hasBasicInfo) {
		// Completed up to work info
		displayPercentage = 75;
	} else if (hasProfessionalInfo && hasContactInfo && hasBasicInfo) {
		// Completed up to professional info + contact
		displayPercentage = 50;
	} else if (hasBasicInfo && hasContactInfo) {
		// Basic registration + contact info (assuming email/phone are part of initial?)
		displayPercentage = 25;
	} else {
		// Default starting point (or adjust if registration gives some %)
		displayPercentage = 0;
	}

	// Return null if 100% complete (hides the progress bar)
	if (isComplete) return null;

	return {
		percentage: displayPercentage,
		message: `¿Por qué completar tu perfil?`,
		ctaText: 'Entérate aquí',
		ctaLink: '#',
	};
};

// Helper function to check if a value is empty (used locally)
const isEmpty = (value: string | undefined | null): boolean => !value || value.trim() === '';

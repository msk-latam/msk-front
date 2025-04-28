import { UserProfileData } from '@/modules/dashboard/components/ProfileEditModal'; // Adjust path if necessary
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

// Define the INTERNAL API endpoint
const INTERNAL_API_ENDPOINT = '/api/save-profile';

// Type for the mutation argument - data to be sent TO the internal API route
interface UpdateProfileArg {
	arg: Partial<UserProfileData>; // Send the data directly
}

// This function now sends data TO our internal API route
async function updateProfileInternal(url: string, { arg }: UpdateProfileArg) {
	console.log('updateProfileInternal', arg);

	const response = await fetch(url, {
		// url is /api/save-profile
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			// No Authorization header needed here; the API route handles it
		},
		body: JSON.stringify(arg), // Send the profile data
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		console.error('Error calling internal save-profile API:', response.status, errorData);
		// Rethrow the error with details from the API route response
		throw new Error(errorData.message || `Failed to save profile: ${response.statusText}`);
	}

	return response.json();
}

export function useSaveUserProfile() {
	// Use the internal API endpoint for the mutation
	const { trigger, isMutating, error } = useSWRMutation(
		INTERNAL_API_ENDPOINT,
		updateProfileInternal, // Use the updated function
		{
			onSuccess: () => {
				console.log('Profile updated successfully via internal API, revalidating /api/profile...');
				// Explicitly revalidate the main profile data fetched by useProfile
				mutate('/api/profile');
			},
			onError: (err) => {
				console.error('Internal save profile mutation failed:', err);
				// TODO: Add user feedback like a toast notification based on err.message
			},
			// throwOnError: false,
		},
	);

	// Adapt the trigger function: it now only needs the data
	// The email is handled by the API route using cookies
	const saveUserProfile = async (data: Partial<UserProfileData>) => {
		// We no longer need to pass the email here
		return trigger(data);
	};

	return {
		mutate: saveUserProfile,
		loading: isMutating,
		error,
	};
}

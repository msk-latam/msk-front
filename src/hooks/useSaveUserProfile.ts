import { UserProfileData } from '@/modules/dashboard/components/ProfileEditModal'; // Adjust path if necessary
import { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

// Define the INTERNAL API endpoint
const INTERNAL_API_ENDPOINT = '/api/save-profile';

// Type for the mutation argument - data to be sent TO the internal API route
interface UpdateProfileArg {
	arg: Partial<UserProfileData>; // Send the data directly
}

const mapArgToInternal = (args: any) => {
	/* Args recibe asi */
	/* {
    "email": "emarmolejo@msklatam.com",
    "name": "Eva",
    "lastName": "Marmolejo",
    "country": "Argentina",
    "phoneCode": "+52",
    "phone": "619961317",
    "fullPhoneNumber": "+52619961317",
    "profession": "Licenciado de la salud",
    "speciality": "bioquimica",
    "workplace": "",
    "workArea": "",
    "belongsToMedicalCollege": false,
    "medicalCollegeName": "",
    "asosiacion": "Colegio de Médicos de la Pcia. de Bs. As. - Distrito II"
} */

	return {
		entity_id_crm: args.crm_id,
		name: args.name,
		last_name: args.lastName,
		profession: args.profession,
		speciality: args.speciality,
		// user_id: 1,
		fiscal_regime: '616 Sin obligaciones fiscales',
		phone: args.phone,
		email: args.email,
		sex: 'Femenino',
		date_of_birth: '1990-05-02',
		country: args.country,
		// postal_code: '1414',
		// address: 'Calle 112',
		// "validate": "NTM0NDQ1NTAwMDAwNDM5ODAyMg==",
		other_profession: '',
		other_speciality: '',
		// state: 'Chiapas',
		career: '',
		year: '',
		// type_doc: 'CUIT',
		// "identification": "XAXX010101001",
		// password: 'xueRK9uD6IQP',
		trial_course_sites: [],
		// "recaptcha_token": "03AFcWeA5QGYnzf3MlcKE-5VHhOrvp7gKHziuNvGzTNMp9NkdVDLezvd00H2uULIv9QbhIV2dUJGgiUq5j7lws2XszhQrf-dpk-5LI669YEhPvw6qF2fwQofTA3B80k9YYiBNWCIA4y4CO42gUR1MH1x5wf-wWLBENFYUH8W6bO393e3VToBqb7uaIRXbTDC9SZ31ddNgBoY17LSEd1DELNVbc079jonyLlOwHCXqHD35XXJWfenSbfrmGKFVfXld6nKBfgRSYmw2MntrSikildRApmyXYzGO72aObzd8vh1yBoWsak7tA0topflN_po8VSTzXMPI_EgRRt6IUPlUyVnfqhBwRndeCJpqOQDXHCNdDpJ3iOh_DOJiT8pBW94jHeK963MCrsDSG65hFUFxUwovK0aqL4oG78wfeLskhH2Fe0x8c9UZPLun6pP1IGyvmYHHjoB3w6zrSSte-2QLsfngMv2d6QdQIpvvJWxKqmSlBa2goGCmU-Vz7vzDlGNdTVra_gxP1sK0lomxNDE0WxceDeYEhkkbhbcU3ApnlyG3Xo1XmVbm0CCejsofGIEN52yk3LK-woLzoffqOEYYcQGQAYjqkN1wApMThXX4ql6q3isVZqkpx6C1NQDv-CoqLJdWw7hts7Rrnanz_Mbu74pqUU3ah8HvZNpn2oo7ddUSlfi-wwQMmNCehSbOPtWMtbfDu1u3Lfc9D5pNmJ6coMXRavw8Pj7mSM7nM7gzOHqvv7Em94mBeC7NK7EVZsPPJTnZO5ZypTi9Z10ALBSsbmxff36aGaDA4uMeYS0MacZI5XRvOWiADyd09lqeZr1IMED7fSEWa_umoaqi-DrLAwA7fUozl6Ode0JpIxn8F4wczBOuoqatkPlhblVcjOxUbpk-I5LQHmUhIa9uf_fsPAXMMOjBkwlBr5kq37GpEXRYIwzJGZTOO0iafJR-zTZwqdhpzNzLqiq86OELgjwIWetDH8tqnAmGIpHFeevEghsjqMKvurvfPc1uI5TBxSylmPgrA9VKzXJJ1UGrnU1BGPtYQ1S4kn7LYrgpnx0BpC2M869-SLOwC54FF3Oqe2mtYC2VxQ_18j_ZfHrl5iBrxHZjHfiT8W55M4kJXX6YVjchzsvQFdaTd8TyoPEUX3jtZHZ4Nwr1Z58NMhCPfLGVyet2dxB7Jezf5oc0YfqMq2ny1ygwu0uQQIj4lOo2-2gtx55Ij0LylV76lBGU58o41915AUfFYTbuDFgA8QAewN5UE235PrscCa0x2XBiw_HAbljmWxkE5fzhA2Zj_7X09wUldANGJt4P3_26F7C0UGxjnfPbdFwtdawZji1v8XbKfnHKOob7T9gsfxBeD7SMd0jCugN8O-VVjBf_VOyb5mjwOlQhFlmftVkSn9Yr2idnoD9CF-n84K0ps788ioz4ETQdcFIWpdD0pBv3JqsUOWe-As-EB_tdlc9-37HDvxp8wFSlNzhUOfEtF7nzQvtNgimtes_sNHYQzQsTa6Qj1DiaCgL0FMr5zLHY73-cWDQddUEaDUH7DJTYu2rGag2kpssQERLK551Ar9ewfJJKumdt_L8aPRsXWMGWD5h3jJspzqLF89OmFZNyRZv3pk5A2YDCjwhipezqzYYvv7evPACFfsN6fD7BPBweDKdO6xVkdxZihFmMPkWvGHjmrDEjupRoNLq54mgJX7YnDfZcG2kJiEmQq8ZWyFC0lqpJs91OmBAMd7mSZdTW3IJSZ9JwtIm1x1yq7Mc9ltGmTchxr711OCPyI66MvgDsFORLOLnaiF6xs4Tyk1Cu7Tfq9UaZMcOvqBbWGrh1WrzHHslOe_HI9seTlmq35nEvHwTjsSzQZ9jOfuDuwPakM4m6JuQOATAXORVxg3Kf5wL8UupfXe8W7MS__lUErMSlAxv_Mc_uOlxwx9DVP-xtgmbOgsEWmANdRkiV7jDaanaZrXUCUsX9WxYTHvZdh_oOBVH-yhPy2XbLNuWb9hgugSsGgXkvr_lOcYxHBYzehw4AsXl7FJdfcoAma1QuI7Lw"
	};
};

// This function now sends data TO our internal API route
async function updateProfileInternal(url: string, { arg }: UpdateProfileArg) {


	const parsedData = mapArgToInternal(arg);

	const response = await fetch(url, {
		// url is /api/save-profile
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			// No Authorization header needed here; the API route handles it
		},
		body: JSON.stringify(parsedData), // Send the profile data
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

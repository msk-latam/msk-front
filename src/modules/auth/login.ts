import auth0 from './auth0';

// Accept an optional connection parameter
export const login = async (connection?: string) => {
	try {
		const options = {
			authorizationParams: {
				connection: connection, // If undefined, Auth0 shows the default login page
			},
		};
		await auth0.loginWithPopup(options);
	} catch (error) {
		// Handle errors, e.g., user closed popup
		console.error('Error during login with popup:', error);
	}
};

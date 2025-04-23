import auth0 from './auth0';

// Accept an optional connection parameter
export const login = async (connection?: string) => {
	console.log('Login function called with connection:', connection);
	try {
		const options = {
			authorizationParams: {
				connection: connection, // If undefined, Auth0 shows the default login page
			},
		};
		console.log('Calling loginWithPopup with options:', options);
		// Pass the connection name in authorizationParams
		await auth0.loginWithPopup(options);
		// You might want to add logic here after successful login
		// const user = await auth0.getUser();
		// console.log(user);
	} catch (error) {
		// Handle errors, e.g., user closed popup
		console.error('Error during login with popup:', error);
	}
};

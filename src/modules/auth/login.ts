import auth0 from './auth0';

export const login = async () => {
  await auth0.loginWithRedirect();
};

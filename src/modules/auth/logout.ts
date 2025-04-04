import auth0 from './auth0';

export const logout = async () => {
  await auth0.logout({
    returnTo: window.location.origin,
  });
};

import auth0 from './auth0';

export const getUser = async () => {
  const user = await auth0.getUser();
  return user;
};

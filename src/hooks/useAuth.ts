import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  //console.group('ProfileEffect');
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();
  //console.log({ state });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await ssr.getUserData();
        // console.log({ res });

        if (res) {
          dispatch({
            type: 'UPDATE_PROFILE',
            payload: { profile: res.contact },
          });
        } else {
          dispatch({ type: 'LOGOUT' });
          router.push('/');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        dispatch({ type: 'LOGOUT' });
        router.push('/');
      }
    };

    if (!state.profile) {
      fetchProfile();
    }
  }, [state.profile, dispatch]);
  //console.groupEnd();

  return {
    ...state,
    isAuthenticated: !!state.profile,
  };
};

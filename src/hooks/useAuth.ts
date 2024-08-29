import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await ssr.getUserData();

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
      router.prefetch('/');
      console.error('Failed to fetch user profile:', error);
      dispatch({ type: 'LOGOUT' });
      router.push('/');
    }
  }, [dispatch, router]);

  useEffect(() => {
    console.log({ state }, state.profile);
    if (!state.profile) {
      fetchProfile();
    }
  }, [state.profile]);

  return {
    ...state,
    isAuthenticated: !!state.profile,
  };
};

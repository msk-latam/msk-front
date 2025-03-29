import { createContext, Dispatch } from "react";
import { AuthState, AuthAction } from "@/data/types";

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {
    stateLoaded: false,
    isAuthenticated: false,
    user: null,
    profile: null,
    token: null,
    email: null,
    expires_at: null,
    bypassRedirect: null,
  },
  dispatch: () => {},
});

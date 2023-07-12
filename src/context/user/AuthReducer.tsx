import { AuthState, AuthAction } from "data/types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("expires_at", action.payload.expires_at);
      const user = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: true,
        user: user ? JSON.parse(user) : null,
        email: action.payload.email,
        token: action.payload.access_token,
        expires_at: action.payload.expires_at,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
        token: null,
        expires_at: null,
      };
    default:
      return state;
  }
};
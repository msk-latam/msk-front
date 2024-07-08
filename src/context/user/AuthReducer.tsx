import { AuthState, AuthAction } from "@/data/types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const FRESH = "FRESH";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_COURSES = "UPDATE_COURSES";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("expires_at", action.payload.expires_at);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.user.name,
          speciality: action.payload.user.speciality,
        })
      );
      const user = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: true,
        stateLoaded: true,
        user: user ? JSON.parse(user) : null,
        profile: action.payload.profile,
        email: action.payload.email,
        token: action.payload.access_token,
        expires_at: action.payload.expires_at,
        bypassRedirect: action.payload.test,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");

      return {
        ...state,
        isAuthenticated: false,
        stateLoaded: true,
        user: null,
        email: null,
        token: null,
        expires_at: null,
        bypassRedirect: null,
      };

    case FRESH:
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.user.name,
          speciality: action.payload.user.speciality,
        })
      );

      const userInLocal = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: true,
        user: userInLocal ? JSON.parse(userInLocal) : null,
      };
    case UPDATE_PROFILE:
      let profileInLocal = {
        ...state,
        user: localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user") as string) : null,
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
        expires_at: localStorage.getItem("expires_at"),
        profile: action.payload.profile,
      };

      return {...profileInLocal};
    case UPDATE_COURSES:
      return {
        ...state,
        profile: {
          ...state?.profile,
          courses_progress: action.payload.courses_progress,
        },
      };
    default:
      return state;
  }
};

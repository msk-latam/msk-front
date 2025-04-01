import { deleteCookie, getCookie } from "@/utils/cookies";
import { UTMAction, UTMState } from "./UTMContext";
import queryString from "query-string";
const queryParams =
  typeof window !== "undefined"
    ? queryString.parse(window.location.search)
    : null;

export const utmInitialState = {
  utm_source:
    queryParams?.utm_source?.toString() || getCookie("utm_source") || "",
  utm_medium:
    queryParams?.utm_medium?.toString() || getCookie("utm_medium") || "",
  utm_campaign:
    queryParams?.utm_campaign?.toString() || getCookie("utm_campaign") || "",
  utm_content:
    queryParams?.utm_content?.toString() || getCookie("utm_content") || "",
};

const GET_UTM = "GET_UTM";
const SET_UTM = "SET_UTM";
const CLEAR_UTM = "CLEAR_UTM";

export const utmReducer = (state: UTMState, action: UTMAction): UTMState => {
  switch (action.type) {
    case GET_UTM:
      return {
        ...state,
        [action.payload.field]: getCookie(action.payload.field),
      };
    case SET_UTM:
      if (action.payload.value === "") {
        deleteCookie(action.payload.field);
      }
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case CLEAR_UTM:
      deleteCookie("utm_source");
      deleteCookie("utm_medium");
      deleteCookie("utm_campaign");
      deleteCookie("utm_content");
      state.utm_campaign = "";
      state.utm_content = "";
      state.utm_medium = "";
      state.utm_source = "";
      return {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
      };
    default:
      return state;
  }
};

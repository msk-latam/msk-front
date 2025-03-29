import { createContext, Dispatch } from "react";

export interface UTMState {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}

export interface UTMAction {
  type: "SET_UTM" | "CLEAR_UTM" | "GET_UTM";
  payload: {
    field: string;
    value?: string;
  };
}

export const UTMContext = createContext<{
  state: UTMState;
  dispatch: Dispatch<UTMAction>;
}>({
  state: {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
  },
  dispatch: () => {},
});

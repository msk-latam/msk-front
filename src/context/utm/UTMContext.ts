import { createContext, Dispatch } from 'react';

export interface UTMState {
	utm_source: string;
	utm_medium: string;
	utm_campaign: string;
	utm_content: string;
}

export type UTMAction =
	| { type: 'SET_UTM'; payload: { field: string; value: string } }
	| { type: 'GET_UTM'; payload: { field: string } }
	| { type: 'CLEAR_UTM' }
	| { type: 'SET_UTMS_ALL'; payload: Partial<UTMState> }; // ✅ nuevo tipo de acción

export const UTMContext = createContext<{
	state: UTMState;
	dispatch: Dispatch<UTMAction>;
}>({
	state: {
		utm_source: '',
		utm_medium: '',
		utm_campaign: '',
		utm_content: '',
	},
	dispatch: () => {},
});

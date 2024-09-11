'use client';
import React, {
  createContext,
  useReducer,
  Dispatch,
  FC,
  ReactNode,
} from 'react';

interface GlobalState {
  isRunning: boolean;
  statuses: { [productSlug: string]: string }; // Diccionario para estados específicos de cada tarjeta
}

type GlobalAction =
  | { type: 'SET_IS_RUNNING'; payload: boolean }
  | { type: 'SET_STATUS'; payload: { productSlug: number; status: string } };

const initialState: GlobalState = {
  isRunning: false,
  statuses: {}, // Estado inicial vacío para los statuses
};

export const GlobalStateContext = createContext<{
  state: GlobalState;
  dispatch1: Dispatch<GlobalAction>;
}>({
  state: initialState,
  dispatch1: () => undefined,
});

const globalReducer = (
  state: GlobalState,
  action: GlobalAction,
): GlobalState => {
  switch (action.type) {
    case 'SET_IS_RUNNING':
      return { ...state, isRunning: action.payload };
    case 'SET_STATUS':
      const { productSlug, status } = action.payload;
      console.log(productSlug, 'PRODUCT SLUG');
      if (!productSlug) {
        console.error('Product slug is missing');
        return state;
      }
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [productSlug]: status,
        },
      };
    default:
      return state;
  }
};

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: FC<GlobalStateProviderProps> = ({
  children,
}: any) => {
  const [state, dispatch1] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch1 }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

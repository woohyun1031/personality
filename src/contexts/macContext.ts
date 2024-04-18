import React from 'react';

export type TMacState = {
  isShow: boolean;
};

interface TActions {
  type: string;
}

interface IMacContext {
  macState: TMacState;
  macDispatch: React.Dispatch<TActions>;
}

export const initialMacState = {
  isShow: false,
};

export const macReducer = (state: TMacState, action: TActions) => {
  switch (action.type) {
    case 'show':
      return {
        ...state,
        isShow: true,
      };
    case 'close':
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export const MacDispatch = React.createContext<IMacContext>({
  macState: initialMacState,
  macDispatch: () => {},
});

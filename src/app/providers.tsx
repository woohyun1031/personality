'use client';

import React from 'react';
import {
  DarkModeDispatch,
  darkModeReducer,
  initialDarkModeState,
} from '@contexts/darkModeContext';
import Header from '@components/Header';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [darkModeState, darkModeDispatch] = React.useReducer(
    darkModeReducer,
    initialDarkModeState,
  );

  React.useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      darkModeDispatch({
        type: 'dark',
      });
    } else {
      document.documentElement.classList.remove('dark');
      darkModeDispatch({
        type: 'light',
      });
    }
  }, []);

  const darkModeContextMemo = React.useMemo(
    () => ({ darkModeState, darkModeDispatch }),
    [darkModeState, darkModeDispatch],
  );

  return (
    <DarkModeDispatch.Provider value={darkModeContextMemo}>
      <Header />
      {children}
    </DarkModeDispatch.Provider>
  );
}

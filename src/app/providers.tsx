'use client';

import React from 'react';
import {
  DarkModeDispatch,
  darkModeReducer,
  initialDarkModeState,
} from '@contexts/darkModeContext';
import {
  initialModalState,
  ModalDispatch,
  modalReducer,
} from '@contexts/modalContext';
import Header from '@components/Header';
import ContactModal from '@components/ContactModal';

export function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [darkModeState, darkModeDispatch] = React.useReducer(
    darkModeReducer,
    initialDarkModeState,
  );

  const [modalState, modalDispatch] = React.useReducer(
    modalReducer,
    initialModalState,
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

  const modalContextMemo = React.useMemo(
    () => ({ modalState, modalDispatch }),
    [modalState, modalDispatch],
  );

  return (
    <DarkModeDispatch.Provider value={darkModeContextMemo}>
      <ModalDispatch.Provider value={modalContextMemo}>
        <Header />
        {children}
        <ContactModal />
      </ModalDispatch.Provider>
    </DarkModeDispatch.Provider>
  );
}

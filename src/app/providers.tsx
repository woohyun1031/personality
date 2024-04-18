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
import { MacDispatch, macReducer } from '@contexts/macContext';

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

  const [macState, macDispatch] = React.useReducer(
    macReducer,
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

  const macContextMemo = React.useMemo(
    () => ({ macState, macDispatch }),
    [macState, macDispatch],
  );

  return (
    <DarkModeDispatch.Provider value={darkModeContextMemo}>
      <ModalDispatch.Provider value={modalContextMemo}>
        <MacDispatch.Provider value={macContextMemo}>
          <Header />
          {children}
        </MacDispatch.Provider>
        <ContactModal />
      </ModalDispatch.Provider>
    </DarkModeDispatch.Provider>
  );
}

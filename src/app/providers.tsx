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
import CustomModal from '@/components/CustomModal';
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

  const [modalContent, setModalContent] = React.useState(
    (<></>) as React.JSX.Element,
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

  function openModal(value: React.JSX.Element) {
    modalDispatch({ type: 'show' });
    setModalContent(value);
  }

  function closeModal() {
    modalDispatch({ type: 'close' });
    setModalContent(<></>);
  }

  const darkModeContextMemo = React.useMemo(
    () => ({ darkModeState, darkModeDispatch }),
    [darkModeState, darkModeDispatch],
  );

  const modalContextMemo = React.useMemo(
    () => ({ modalState, modalDispatch, openModal, closeModal }),
    [modalState, modalDispatch, openModal, closeModal],
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
        <CustomModal content={modalContent} />
      </ModalDispatch.Provider>
    </DarkModeDispatch.Provider>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { DarkModeDispatch } from '@contexts/darkModeContext';
import SunIcon from '@components/icons/SunIcon';
import MoonIcon from '@components/icons/MoonIcon';
import { ModalDispatch } from '@/contexts/modalContext';

export default function Header() {
  const { darkModeState, darkModeDispatch } =
    React.useContext(DarkModeDispatch);
  const { modalDispatch } = React.useContext(ModalDispatch);

  const { isDark } = darkModeState;

  const changeTheme = React.useCallback(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      if (localTheme === 'dark') {
        localStorage.removeItem('theme');
        document.documentElement.classList.remove('dark');
        return darkModeDispatch({ type: 'light' });
      }
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      darkModeDispatch({ type: 'dark' });
    }
  }, []);

  function openModal() {
    modalDispatch({ type: 'show' });
  }

  return (
    <header
      className="common-animation fixed top-0 z-50 flex h-16 
      w-full justify-center bg-white bg-opacity-75 px-6 py-3 backdrop-blur-md dark:bg-gray-600"
    >
      <div
        className="mx-2 flex w-full flex-wrap items-center 
        justify-between"
      >
        <Link
          href="/"
          className="relative flex h-full flex-shrink-0 
          cursor-pointer items-center text-sm font-normal text-gray-600 dark:text-white"
        >
          my personality
        </Link>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="
              text-sm font-normal text-gray-600 
            duration-300 hover:text-red-400 active:text-red-600 dark:text-white dark:hover:text-red-400
            dark:active:text-red-600
            "
            onClick={() => openModal()}
          >
            contact
          </button>
          <button
            type="button"
            className="h-5 w-5 text-gray-600 dark:text-white"
            onClick={() => changeTheme()}
          >
            {isDark ? <SunIcon key="sun" /> : <MoonIcon key="moon" />}
          </button>
        </div>
      </div>
    </header>
  );
}

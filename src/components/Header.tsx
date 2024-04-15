'use client';

import React from 'react';
import Link from 'next/link';
import { DarkModeDispatch } from '@contexts/darkModeContext';
import SunIcon from '@components/icons/SunIcon';
import MoonIcon from '@components/icons/MoonIcon';

export default function Header() {
  const { darkModeState, darkModeDispatch } =
    React.useContext(DarkModeDispatch);
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

  return (
    <header
      className="fixed top-0 z-50 flex h-16 w-full 
      justify-center bg-opacity-75 px-6 py-3 backdrop-blur-md  dark:bg-gray-600"
    >
      <div
        className="mx-2 flex w-full flex-wrap items-center 
        justify-between"
      >
        <Link
          href="/"
          className="relative mr-6 flex h-full flex-shrink-0 
          cursor-pointer items-center text-xl font-bold text-gray-600 dark:text-white"
        >
          b2m
          <span className="ml-4 text-base font-normal">book music movie</span>
        </Link>

        <button
          type="button"
          className="h-5 w-5 text-gray-600 dark:text-white"
          onClick={() => changeTheme()}
        >
          {isDark ? <SunIcon key="sun" /> : <MoonIcon key="moon" />}
        </button>
      </div>
    </header>
  );
}

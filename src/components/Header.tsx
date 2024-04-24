'use client';

import React from 'react';
import Link from 'next/link';
import { DarkModeDispatch } from '@contexts/darkModeContext';
import SunIcon from '@components/icons/SunIcon';
import MoonIcon from '@components/icons/MoonIcon';
import { ModalDispatch } from '@contexts/modalContext';
import { usePathname } from 'next/navigation';
import LinkButton from './LinkButton';
import URL from '@/constants/url';

export default function Header() {
  const { darkModeState, darkModeDispatch } =
    React.useContext(DarkModeDispatch);
  const { openModal } = React.useContext(ModalDispatch);
  const { isDark } = darkModeState;
  const pathname = usePathname();
  const currentPath = pathname.replace('/', '');

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

  function openContactModal() {
    return openModal(
      <div className="flex h-full w-full items-center justify-center">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="mt-2 text-lg text-white dark:text-white">
            Hello, I'm Woohyun Kim 👋
          </div>
          <div className="mt-2 text-sm text-white dark:text-white">
            I specialize in building features to solve user problems and
            enhancing them technically.
          </div>
          <div className="mt-2 text-sm text-white dark:text-white">
            My primary tools are TypeScript, React.js, and Next.js, but I also
            enjoy working with Vanilla.js on personal projects.
          </div>
          <div className="mt-2 text-sm text-white dark:text-white">
            Lately, I've been immersing myself in both work and hobbies related
            to development.
          </div>
          <div className="mt-2 text-sm text-white dark:text-white">
            I consistently record these experiences and interesting problems in
            <LinkButton url={URL.notion} className="ml-2 mr-1">
              +
            </LinkButton>
            Notion.
          </div>
          <div className="mt-2 text-sm text-white dark:text-white">
            Occasionally, I integrate these notes with my
            <LinkButton url={URL.blog} className="ml-2 mr-1">
              +
            </LinkButton>
            blog posts, addressing issues I encounter directly.
          </div>

          <div className="mt-12 text-sm">
            <LinkButton url={URL.mail} className="ml-2 mr-1 text-sm">
              email
            </LinkButton>
            <LinkButton url={URL.github} className="ml-2 mr-1 text-sm">
              github
            </LinkButton>
            <LinkButton url={URL.blog} className="ml-2 mr-1 text-sm">
              blog
            </LinkButton>
          </div>
        </div>
      </div>,
    );
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
        <span className="text-sm font-normal text-gray-600 dark:text-white">
          {currentPath}
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="
              text-sm font-normal text-gray-600 
              duration-300 hover:text-red-400 active:text-red-600 dark:text-white dark:hover:text-red-400
            dark:active:text-red-600"
            onClick={() => openContactModal()}
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

import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header
      className="fixed top-0 z-50 flex h-16 w-full 
      justify-center bg-gray-600 bg-opacity-75 px-6 py-3 backdrop-blur-md"
    >
      <div
        className="mx-2 flex w-full flex-wrap items-center 
        justify-start"
      >
        <Link
          href="/"
          className="relative mr-6 flex h-full flex-shrink-0 
          cursor-pointer items-center text-xl font-bold text-white"
        >
          book, music, movie
          {/* <span className="ml-4 text-base font-normal">sliding books</span> */}
        </Link>
      </div>
    </header>
  );
}

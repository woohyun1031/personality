import BooksIcon from '@/components/icons/BooksIcon';
import CdsIcon from '@components/icons/CdsIcon';
import MacIcon from '@components/icons/MacIcon';
import PostitsIcon from '@components/icons/PostitsIcon';
import TableIcon from '@components/icons/TableIcon';
import React from 'react';

export default async function Page() {
  return (
    <section className="flex h-screen items-center justify-center p-[5rem]">
      <div className="flex flex-col">
        <div className="mb-5 flex h-full justify-end pr-6 text-gray-600 dark:text-white">
          <PostitsIcon />
        </div>
        <div className="flex h-full w-[550px] items-end justify-center gap-3">
          <div className="h-full w-[170px] text-gray-600 dark:text-white">
            <BooksIcon />
          </div>
          <div className="h-full w-[180px] text-gray-600 dark:text-white ">
            <MacIcon />
          </div>
          <div className="h-full w-[75px] text-gray-600 dark:text-white ">
            <CdsIcon />
          </div>
        </div>
        <div className="flex max-w-[550px] justify-center text-gray-600 dark:text-white">
          <TableIcon />
        </div>
      </div>
    </section>
  );
}

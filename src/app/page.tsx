import BookIcon from '@/components/icons/BookIcon';
import BooksIcon from '@/components/icons/BooksIcon';
import CDIcon from '@/components/icons/CDIcon';
import CDsIcon from '@/components/icons/CDsIcon';
import PostitIcon from '@/components/icons/PostitIcon';
import MacIcon from '@components/icons/MacIcon';
import PostitsIcon from '@components/icons/PostitsIcon';
import TableIcon from '@components/icons/TableIcon';
import React from 'react';

export default async function Page() {
  return (
    <section className="flex h-screen items-center justify-center p-[5rem]">
      <div className="flex flex-col items-center">
        <div className="mb-5 flex w-full flex-row justify-end">
          <div className="common-animation group relative h-full cursor-pointer text-gray-600 dark:text-white">
            <PostitsIcon />
            <div className="common-animation absolute bottom-[-20px] right-[30px] cursor-pointer text-gray-600 group-hover:animate-sway_animation dark:text-white [&:not(:hover)]:animate-not_sway_animation">
              <PostitIcon />
            </div>
          </div>
        </div>
        <div className="flex h-full w-[550px] items-end justify-center gap-3">
          <div className="common-animation group relative h-full w-[170px] cursor-pointer text-gray-600 dark:text-white">
            <BooksIcon />
            <div className="common-animation absolute bottom-[-18px] left-12 h-full w-[15px] text-gray-600 group-hover:-translate-y-6 dark:text-white">
              <BookIcon />
            </div>
          </div>
          <div className="common-animation h-full w-[180px] text-gray-600 dark:text-white ">
            <MacIcon />
          </div>
          <div className="common-animation group relative h-full w-[75px] cursor-pointer text-gray-600 dark:text-white">
            <CDsIcon />
            <div
              className="common-animation absolute bottom-[23px] left-0 h-full w-[70px] text-gray-600 
            group-hover:-translate-y-5
            group-hover:rotate-[-9deg] dark:text-white"
            >
              <CDIcon />
            </div>
          </div>
        </div>
        <div className="common-animation flex max-w-[550px] justify-center text-gray-600 dark:text-white">
          <TableIcon />
        </div>
      </div>
    </section>
  );
}

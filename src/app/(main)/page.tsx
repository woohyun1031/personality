import BookIcon from '@/components/icons/BookIcon';
import BooksIcon from '@/components/icons/BooksIcon';
import CDIcon from '@/components/icons/CDIcon';
import CDsIcon from '@/components/icons/CDsIcon';
import PostitIcon from '@/components/icons/PostitIcon';
import MacIcon from '@components/icons/MacIcon';
import PostitsIcon from '@components/icons/PostitsIcon';
import TableIcon from '@components/icons/TableIcon';
import Image from 'next/image';
import React from 'react';

export default async function Page() {
  function onClick() {
    // downAnimation() 스톱
    // navigation() 스톱
  }

  return (
    <section className="flex h-screen items-center justify-center p-[5rem]">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="mb-5 flex w-full max-w-[600px] flex-row justify-end">
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
            <div className="common-animation group relative h-full w-[180px] cursor-pointer overflow-hidden text-gray-600 dark:text-white">
              <div className="relative z-50 overflow-hidden">
                <MacIcon />
              </div>
              <div
                className="common-animation absolute bottom-[6px] 
              left-[50%] z-10 h-[100px] w-[164px] translate-x-[-50%]
              overflow-hidden                      
              text-gray-600
              group-hover:visible group-hover:animate-purse_animation dark:text-white [&:not(:hover)]:animate-not_purse_animation"
              >
                <Image
                  src={'/images/notting-hill.jpg'}
                  fill
                  alt="movie"
                  className="z-10 object-cover opacity-85 brightness-90 dark:opacity-85 dark:brightness-125 "
                />
              </div>
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
        <div className="w-full max-w-[600px]">
          <div className="mt-16 text-base text-gray-600 dark:text-white">
            Through my desk, I'll show you my personality 👋
          </div>

          <div className="mt-10 text-sm text-gray-600 dark:text-white">
            My desk represents my individuality expressed through books, music,
            movie, and photography. Also, I used programming to express aspects
            of my life that weren't related to programming 🚀 This project drew
            much inspiration and influence from Interactive Developer Kim
            Jongmin's 'DESK:where creativity is born' project. <br />
            I'd like to express my gratitude.
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-white">
            Click on each element to see more details.
          </div>

          <div className="mt-2 text-sm text-gray-600 dark:text-white">
            Enjoy it!
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useResize } from '@hooks/useResize';
import {
  BookIcon,
  BooksIcon,
  AlbumIcon,
  AlbumsIcon,
  PhotoIcon,
  MacIcon,
  PhotosIcon,
  DeskIcon,
} from '@components/icons';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { MacDispatch } from '@contexts/macContext';

export default function Desk() {
  const isDesktop = useResize('(min-width: 768px)');
  const { macState, macDispatch } = React.useContext(MacDispatch);

  const componentSizes = React.useMemo(() => {
    return {
      photoGroup: isDesktop ? 'max-w-[550px]' : 'max-w-[350px]',
      photos: isDesktop ? 'w-[100px]' : 'w-[63px]',
      photo: isDesktop
        ? 'bottom-[-20px] right-[30px] h-[22px] w-[16px]'
        : 'bottom-[-12px] right-[19px] h-[14px] w-[10px]',
      deskGroup: isDesktop ? 'w-[550px]' : 'w-[350px]',
      books: isDesktop ? 'w-[170px]' : 'w-[108px]',
      book: isDesktop
        ? 'bottom-[-18px] left-12 h-full w-[15px]'
        : 'bottom-[-13px] left-[30.5px] h-full w-[9px]',
      mac: isDesktop ? 'w-[180px]' : 'w-[114px]',
      screen: isDesktop
        ? 'bottom-[6px] left-[50%] z-10 h-[100px] w-[164px] translate-x-[-50%]'
        : 'bottom-[3px] left-[50%] z-10 h-[64px] w-[104px] translate-x-[-50%]',
      cds: isDesktop ? 'w-[75px]' : 'w-[48px]',
      cd: isDesktop
        ? 'bottom-[23px] left-0 h-full w-[70px]'
        : 'bottom-[14px] left-0 h-full w-[44px]',
      desk: isDesktop ? 'max-w-[550px]' : 'max-w-[350px]',
    };
  }, [isDesktop]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className={`mb-5 flex w-full ${componentSizes.photoGroup} flex-row justify-end`}
        >
          <Link
            href="/gallery"
            className={`common-animation group relative h-full ${componentSizes.photos} cursor-pointer text-gray-600 dark:text-white`}
          >
            <PhotosIcon />
            <div
              className={`common-animation absolute ${componentSizes.photo} cursor-pointer text-gray-600 group-hover:animate-sway_animation dark:text-white [&:not(:hover)]:animate-not_sway_animation`}
            >
              <PhotoIcon />
            </div>
          </Link>
        </div>
        <div
          className={`flex h-full ${componentSizes.deskGroup} items-end justify-center gap-3`}
        >
          <Link
            href="/books"
            className={`common-animation group relative h-full ${componentSizes.books} cursor-pointer text-gray-600 dark:text-white`}
          >
            <BooksIcon />
            <div
              className={`common-animation absolute ${componentSizes.book} text-gray-600 group-hover:-translate-y-6 dark:text-white`}
            >
              <BookIcon />
            </div>
          </Link>
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              macDispatch({ type: 'show' });
            }}
            className={`${
              macState.isShow ? 'fixed left-0 top-0' : 'group relative'
            } ${
              componentSizes.mac
            } common-animation group relative z-[50] h-full cursor-pointer overflow-hidden text-gray-600 duration-300 dark:text-white`}
          >
            <div className="relative overflow-hidden">
              <MacIcon />
            </div>
            {/* <div
              className={`${componentSizes.screen} absolute z-40 scale-[4] bg-white dark:bg-gray-600 `}
            /> */}
            <div
              className={`common-animation absolute 
            ${componentSizes.screen}
              overflow-hidden                      
              text-gray-600
              group-hover:visible group-hover:animate-purse_animation 
              dark:text-white [&:not(:hover)]:animate-not_purse_animation`}
            >
              <Image
                src={'/images/notting-hill.jpg'}
                fill
                alt="movie"
                className="z-10 object-cover opacity-85 brightness-90 dark:opacity-85 dark:brightness-125 "
              />
            </div>
          </Link>
          <Link
            href="/music"
            className={`common-animation group relative h-full ${componentSizes.cds} z-10 cursor-pointer text-gray-600 dark:text-white`}
          >
            <AlbumsIcon />
            <div
              className={`common-animation absolute ${componentSizes.cd} text-gray-600 
            group-hover:-translate-y-5
            group-hover:rotate-[-9deg] dark:text-white`}
            >
              <AlbumIcon />
            </div>
          </Link>
        </div>
        <div
          className={`common-animation flex ${componentSizes.desk} justify-center text-gray-600 dark:text-white`}
        >
          <DeskIcon />
        </div>
      </div>
    </>
  );
}

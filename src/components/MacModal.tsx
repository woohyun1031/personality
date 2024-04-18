'use client';

import Image from 'next/image';
import React from 'react';
import { MacDispatch } from '@contexts/macContext';
import { imagesMock } from '@constants/imagesMock';

export default function MacModal() {
  const { macState, macDispatch } = React.useContext(MacDispatch);
  const [imageId, setImageId] = React.useState<string>();
  const { isShow } = macState;

  return (
    <div
      className={`${
        isShow
          ? 'opacity-1 visible translate-y-0'
          : 'opacity-1 invisible translate-y-[1000px]'
      } fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center
    bg-white duration-300 dark:bg-gray-600 `}
      onClick={() => {
        macDispatch({ type: 'close' });
      }}
    >
      <div className="flex h-full w-full flex-col justify-between gap-3 px-10 pt-10">
        <div className="h-full max-h-[600px] w-full">
          <div className="flex h-full items-center justify-center">
            <div className="h-full w-auto">
              <img
                src={imageId ? imagesMock[imageId] : '/images/notting-hill.jpg'}
                alt="movie"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="h-[100px] w-full px-3">
          <div className="flex h-full w-full flex-row items-center gap-x-3 overflow-scroll">
            {Object.entries(imagesMock).map(([key]) => {
              return (
                <div
                  className="relative h-[50px] w-[50px] flex-shrink-0 flex-grow-0 
                  cursor-pointer overflow-hidden rounded-2xl border-b-4  border-gray-700 dark:border-white sm:h-[60px]
                  sm:w-[60px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageId(key);
                  }}
                >
                  <img
                    src={imagesMock[key]}
                    alt="movie"
                    className="absolute h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className="fixed right-10 top-5 z-50 h-10 w-10 rounded border-b-4 
        border-red-700 bg-red-500
        px-2 py-0.5
        font-bold text-white
        hover:border-red-500 hover:bg-red-400"
        onClick={() => macDispatch({ type: 'close' })}
        onTouchStart={(e) => {
          e.preventDefault();
          macDispatch({ type: 'close' });
        }}
      >
        x
      </button>
    </div>
  );
}

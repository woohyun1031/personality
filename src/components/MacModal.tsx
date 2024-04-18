'use client';

import Image from 'next/image';
import React from 'react';
import { MacDispatch } from '@contexts/macContext';
import { imagesMock } from '@constants/imagesMock';

export default function MacModal() {
  const { macState, macDispatch } = React.useContext(MacDispatch);
  const [currentImage, setCurrentImage] = React.useState<string>();
  const { isShow } = macState;

  React.useEffect(() => {}, [currentImage]);

  return (
    <div
      className={`${
        isShow
          ? 'opacity-1 visible translate-y-0'
          : 'opacity-1 invisible translate-y-[1000px]'
      } fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center
    bg-white duration-500 ease-easeInOutQuart dark:bg-black`}
      onClick={() => {
        macDispatch({ type: 'close' });
      }}
    >
      <div className="flex h-full w-full flex-col justify-between gap-3 px-10 pt-10">
        <div className={`h-full max-h-[600px] w-full`}>
          <div className="flex h-full items-center justify-center">
            <div className="h-full w-auto">
              {currentImage ? (
                <img
                  src={imagesMock[currentImage]}
                  alt="movie"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-white">Click!</div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[100px] w-full px-3">
          <div className="flex h-full w-full flex-row items-center gap-x-3 overflow-scroll">
            {Object.entries(imagesMock).map(([key]) => {
              return (
                <div
                  className={`relative h-[50px] w-[50px] flex-shrink-0 flex-grow-0 
                  cursor-pointer overflow-hidden rounded-2xl border-b-4  border-gray-700 duration-300 ease-in-out                  
                  dark:border-gray-300
                  sm:h-[60px]
                  sm:w-[60px]
                  ${
                    currentImage == key
                      ? '-translate-y-4'
                      : 'hover:-translate-y-2'
                  }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(key);
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
        className="fixed right-10 top-5 z-50 h-8 w-8 origin-center text-lg
        font-bold
        text-gray-600
        duration-300
        hover:rotate-45
        hover:text-red-400
        dark:text-white
        dark:hover:text-red-400	
        "
        onClick={() => macDispatch({ type: 'close' })}
        onTouchStart={(e) => {
          e.preventDefault();
          macDispatch({ type: 'close' });
        }}
      >
        +
      </button>

      <button
        className="fixed left-10 top-[50%] z-50 h-8 w-8 origin-center text-lg
        font-bold
        text-gray-600
        duration-300
        hover:-translate-x-4
        hover:text-red-400
        dark:text-white
        dark:hover:text-red-400	
        "
        onClick={() => macDispatch({ type: 'close' })}
        onTouchStart={(e) => {
          e.preventDefault();
          macDispatch({ type: 'close' });
        }}
      >
        {`<`}
      </button>

      <button
        className="fixed right-10 top-[50%] z-50 h-8 w-8 origin-center text-lg
        font-bold
        text-gray-600
        duration-300
        hover:translate-x-4
        hover:text-red-400
        dark:text-white
        dark:hover:text-red-400	
        "
        onClick={() => macDispatch({ type: 'close' })}
        onTouchStart={(e) => {
          e.preventDefault();
          macDispatch({ type: 'close' });
        }}
      >
        {`>`}
      </button>
    </div>
  );
}

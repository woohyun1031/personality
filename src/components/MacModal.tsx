'use client';

import React from 'react';
import { MacDispatch } from '@contexts/macContext';
import { imagesMock } from '@constants/imagesMock';

export default function MacModal() {
  const { macState, macDispatch } = React.useContext(MacDispatch);
  const [currentId, setCurrentId] = React.useState<string>('1');
  const { isShow } = React.useMemo(() => macState, [macState]);
  const movieArray = React.useMemo(
    () => Object.entries(imagesMock).map(([id, src]) => [id, src]),
    [imagesMock],
  );
  const currentMovieIndex = React.useMemo(
    () => movieArray.findIndex(([id]) => id == currentId),
    [movieArray, currentId],
  );

  return (
    <div
      className={`${
        isShow
          ? 'opacity-1 visible translate-y-0'
          : 'opacity-1 invisible translate-y-[1000px]'
      } fixed left-0 top-0 z-[50] flex h-full w-full items-center justify-center
      bg-white duration-500 ease-easeInOutQuart dark:bg-black`}
    >
      <div className="flex h-full w-full flex-col justify-between gap-3 px-10 pt-10">
        <div className="relative h-full w-full">
          <div className="flex h-full w-full flex-row gap-3 duration-300">
            {movieArray.map(([mId, src], mIndex) => {
              return (
                <div
                  key={mId}
                  className={`absolute left-[50%] h-full duration-300 ${
                    currentId == mId ? 'w-full' : 'w-0'
                  } ${
                    mIndex == currentMovieIndex
                      ? 'opacity-1 translate-x-[-50%]'
                      : mIndex == currentMovieIndex - 1
                      ? 'opacity-0 translate-x-[-1000px]'
                      : mIndex == currentMovieIndex + 1
                      ? 'opacity-0 translate-x-[1000px]'
                      : mIndex > currentMovieIndex
                      ? 'invisible translate-x-[5000px]'
                      : 'invisible translate-x-[-5000px]'
                  }`}
                >
                  <div
                    key={mId}
                    className="flex h-full items-center justify-center"
                  >
                    <div key={mId} className="h-full w-auto">
                      <img
                        key={mId}
                        src={src}
                        alt="movie"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="h-[120px] w-full px-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full w-full flex-row items-center gap-x-3 overflow-scroll">
            {movieArray.map(([mId, src]) => {
              return (
                <div
                  key={mId}
                  className={`relative h-[40px] w-[40px] flex-shrink-0 flex-grow-0 
                  cursor-pointer overflow-hidden rounded-2xl border-b-4  border-gray-700 duration-300 ease-in-out                  
                  dark:border-gray-300
                  sm:h-[50px]
                  sm:w-[50px]
                  ${
                    mId == currentId ? '-translate-y-4' : 'hover:-translate-y-2'
                  }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(mId);
                  }}
                >
                  <img
                    src={src}
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
        hover:text-red-400
        hover:rotate-45
        dark:text-white
        dark:hover:text-red-400	
        "
        onClick={() => {
          macDispatch({ type: 'close' });
        }}
      >
        +
      </button>

      <button
        className={`fixed left-10 top-[50%] z-50 h-8 w-8 origin-center
        text-lg
        font-bold
        text-gray-600
        duration-300        
        hover:text-red-400 hover:-translate-x-2 
        dark:text-white dark:hover:text-red-400         
        `}
        onClick={(e) => {
          e.stopPropagation();
          const prevMovieId = movieArray.slice()[currentMovieIndex - 1]?.[0];
          setCurrentId(
            prevMovieId ? prevMovieId : movieArray[movieArray.length - 1][0],
          );
        }}
      >
        {`<`}
      </button>

      <button
        className={`fixed right-10 top-[50%] z-50 h-8 w-8 origin-center text-lg
        font-bold
        text-gray-600
        duration-300
        hover:text-red-400        
        hover:translate-x-2 dark:text-white dark:hover:text-red-400
        `}
        onClick={(e) => {
          e.stopPropagation();
          const nextMovieId = movieArray.slice()[currentMovieIndex + 1]?.[0];
          setCurrentId(nextMovieId ? nextMovieId : movieArray[0][0]);
        }}
      >
        {`>`}
      </button>
    </div>
  );
}

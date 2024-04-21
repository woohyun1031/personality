'use client';

import ImageForm from '@components/ImageForm';
import { MacDispatch } from '@contexts/macContext';
import { musicsMock } from '@constants/imagesMock';
import { useRouter } from 'next/navigation';
import React from 'react';
import CDComponent from '@components/CDComponent';

export default function Form() {
  const [currentId, setCurrentId] = React.useState<string>('1');
  const musicArray = React.useMemo(
    () => Object.entries(musicsMock).map(([id, value]) => ({ id, ...value })),
    [musicsMock],
  );
  const currentMusicIndex = React.useMemo(
    () => musicArray.findIndex(({ id }) => id == currentId),
    [musicArray, currentId],
  );

  return (
    <div
      className={`flex h-full w-full items-center justify-center overflow-hidden p-[64px]`}
    >
      <div className="flex h-full w-full flex-col justify-between gap-3 px-10 pt-10">
        <div className="relative h-full w-full">
          <div className="flex h-full w-full flex-row gap-3 duration-300">
            {musicArray.map(({ id, src }, mIndex) => {
              return (
                <div
                  key={id}
                  className={`absolute left-[50%] duration-300 ${
                    currentId == id ? 'h-full w-full' : 'h-full w-[200px]'
                  } ${
                    mIndex == currentMusicIndex
                      ? 'opacity-1 z-20 translate-x-[-50%]'
                      : mIndex == currentMusicIndex - 1
                      ? 'rotate-y-100 z-10 opacity-20 perspective-500  translate-x-[-350px] perspective-origin-right dark:opacity-10'
                      : mIndex == currentMusicIndex + 1
                      ? 'rotate-y-100 z-10 opacity-20 perspective-500 translate-x-[150px] perspective-origin-left dark:opacity-10'
                      : mIndex > currentMusicIndex
                      ? 'invisible translate-x-[5000px]'
                      : 'invisible translate-x-[-5000px]'
                  }`}
                >
                  <div
                    key={id}
                    className="flex h-full items-center justify-center"
                  >
                    <div
                      key={id}
                      className="group relative 
                      h-[300px] w-[300px] cursor-pointer duration-300 hover:translate-x-[-110px]                       
                      sm:h-[366px] sm:w-[366px] 
                      lg:h-[466px] lg:w-[466px]"
                    >
                      <img
                        key={id}
                        src={src}
                        alt="movie"
                        className="relative z-20 h-full w-full object-contain duration-300 group-hover:blur-[1px] group-hover:brightness-50 "
                      />
                      {mIndex == currentMusicIndex && (
                        <div
                          key={id}
                          className="absolute top-[50%] z-10 h-auto w-auto duration-300 translate-y-[-50%] group-hover:translate-x-[250px]"
                        >
                          <CDComponent src={src} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-[200px] w-full" onClick={(e) => e.stopPropagation()}>
          <div className="flex h-full w-full flex-col items-center gap-x-3 overflow-scroll">
            {/* {musicArray.map(({ id, title }, index) => {
              return (
                <div
                  key={id}
                  className={`
                  ${
                    id == currentId
                      ? 'text-red-400 dark:text-red-400'
                      : 'text-gray-600 dark:text-white'
                  }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentId(id);
                  }}
                >
                  {`${index + 1}: ${title}`}
                </div>
              );
            })} */}
          </div>
        </div>
      </div>

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
          const prevMovieId = musicArray.slice()[currentMusicIndex - 1]?.id;
          setCurrentId(
            prevMovieId ? prevMovieId : musicArray[musicArray.length - 1].id,
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
          const nextMovieId = musicArray.slice()[currentMusicIndex + 1]?.id;
          setCurrentId(nextMovieId ? nextMovieId : musicArray[0].id);
        }}
      >
        {`>`}
      </button>
    </div>
  );
}

'use client';

import React from 'react';
import { musicsMock } from '@constants/imagesMock';
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
      className={`flex h-full w-full items-center justify-center overflow-hidden px-[12px] sm:px-[64px]`}
    >
      <div className="relative flex h-full w-full items-center duration-300">
        {musicArray.map(({ id, src }, mIndex) => {
          return (
            <div
              key={id}
              className={`absolute left-[50%] duration-300 ${
                currentId == id ? 'h-auto w-full' : 'h-auto w-full scale-75'
              } ${
                mIndex == currentMusicIndex
                  ? 'opacity-1 z-20 translate-x-[-50%]'
                  : mIndex == currentMusicIndex - 1
                  ? 'z-10 opacity-20 perspective-500 translate-x-[-70%] dark:opacity-10'
                  : mIndex == currentMusicIndex + 1
                  ? 'z-10 opacity-20 perspective-500 translate-x-[-30%] dark:opacity-10'
                  : mIndex > currentMusicIndex
                  ? 'invisible translate-x-[5000px]'
                  : 'invisible translate-x-[-5000px]'
              }`}
            >
              <div key={id} className="flex h-auto items-center justify-center">
                <div
                  key={id}
                  className={`
                      group relative
                      h-[130px] w-[130px]                       
                      cursor-pointer duration-300                      
                      phone:h-[200px] phone:w-[200px] 
                      sm:h-[366px] sm:w-[366px] 
                      lg:h-[466px] lg:w-[466px] 
                      lg:hover:translate-x-[-110px]                    
                      `}
                >
                  <img
                    key={id}
                    src={src}
                    alt="movie"
                    className={`relative z-20 h-full w-full object-contain duration-300 
                        ${
                          mIndex == currentMusicIndex &&
                          'group-hover:blur-[1px] group-hover:brightness-50'
                        }`}
                  />
                  {mIndex == currentMusicIndex && (
                    <div
                      key={id}
                      className="
                          absolute top-[50%] z-10 h-[80%] w-[80%] 
                          duration-300 translate-y-[-50%]                          
                          group-hover:translate-x-[70%]"
                    >
                      <CDComponent src={src} />
                    </div>
                  )}

                  {mIndex == currentMusicIndex && (
                    <div
                      key={id}
                      className={`
                          fixed left-[-50%] z-20 mt-3 h-full w-full 
                          bg-[rgba(0,0,0,0.4)]
                          opacity-0 backdrop-blur-md 
                          duration-300
                          translate-x-[50%]
                          group-hover:opacity-[1]

                          sm:absolute sm:top-[50%] sm:mt-0 sm:bg-none
                          sm:backdrop-blur-none sm:translate-y-[-50%]
                          `}
                    >
                      <div className="flex h-full w-full flex-col items-start gap-x-3 overflow-scroll p-6">
                        <div className="mt-2 text-lg text-white dark:text-white">
                          ▶️ I specialize in building features
                        </div>
                        <div className="mt-2 text-sm text-white dark:text-white">
                          Woohyun Kim - 2014.12.31
                        </div>
                        <div className="mt-2 text-sm text-white dark:text-white">
                          "My primary tools are TypeScript, React.js, and
                          Next.js, but I also enjoy working with Vanilla.js on
                          personal projects."
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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

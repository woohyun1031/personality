'use client';

import React from 'react';

export default function CDComponent({ src }: { src: string }) {
  return (
    <div
      className="relative 
      h-[130px] w-[130px] 
      opacity-5 duration-300 
      group-hover:opacity-[1] phone:h-[200px] 
      phone:w-[200px] sm:h-[340px] sm:w-[340px] lg:h-[430px] lg:w-[430px]"
    >
      <img
        src={src}
        alt="movie"
        className="h-full w-full origin-center rounded-[50%] border border-gray-200 object-cover rotate-12 dark:border-gray-500"
      />
      <div
        className="absolute 
        left-[50%] top-[50%] 
        h-[20%] w-[20%] 
        rounded-[50%] 
        border-2 border-gray-600 bg-white translate-x-[-50%] translate-y-[-50%] 
        dark:border-white dark:bg-gray-600"
      />
    </div>
  );
}

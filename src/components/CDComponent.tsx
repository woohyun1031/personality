'use client';

import React from 'react';

export default function CDComponent({ src }: { src: string }) {
  return (
    <div
      className="relative       
      h-full w-full       
      opacity-5	
      group-hover:animate-cd_spin_animation
      group-hover:opacity-[1]       
      "
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

'use client';

import React from 'react';
import GridImageForm from '@components/GridImageForm';
import { imagesMock } from '@constants/imagesMock';
import { useResize } from '@hooks/useResize';

export default function Form() {
  const isDesktop = useResize('(min-width: 768px)');

  return (
    <div
      className={`grid auto-rows-[1px] ${
        isDesktop
          ? 'grid-cols-[repeat(auto-fill,298px)] gap-x-4 px-32'
          : 'grid-cols-[repeat(auto-fill,200px)] gap-x-4 px-9'
      } justify-center py-32`}
    >
      {Object.entries(imagesMock).map(([key]) => {
        return <GridImageForm key={key} id={key} isDesktop={isDesktop} />;
      })}
    </div>
  );
}

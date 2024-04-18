'use client';

import GridImageForm from '@components/GridImageForm';
import { imagesMock } from '@constants/imagesMock';
import React from 'react';

export default function Form() {
  return (
    <div className="grid auto-rows-[1px] grid-cols-[repeat(auto-fill,298px)] justify-center gap-x-8 p-32">
      {Object.entries(imagesMock).map(([key]) => {
        return <GridImageForm key={key} id={key} />;
      })}
    </div>
  );
}

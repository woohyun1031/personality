'use client';

import ImageForm from '@components/ImageForm';
import { imagesMock } from '@constants/imagesmock';
import React from 'react';

export default function Form() {
  return (
    <div className="grid auto-rows-[1px] grid-cols-[repeat(auto-fill,298px)] justify-center gap-x-8 p-32">
      {Object.entries(imagesMock).map(([key]) => {
        return <ImageForm key={key} id={key} />;
      })}
    </div>
  );
}

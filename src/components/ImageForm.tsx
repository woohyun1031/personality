'use client';

import { ModalDispatch } from '@/contexts/modalContext';
import { getLevel, levels } from '@app/(main)/gallery/form';
import { galleryMock } from '@constants/imagesMock';
import React, { useRef, useEffect, useState } from 'react';

const ImageForm = React.forwardRef(
  (
    {
      id,
      index,
      initPosition,
      width,
    }: {
      id: string;
      index: number;
      initPosition: { x: number; y: number };
      width: number;
    },
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const level = getLevel(index);
    const positionRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(true);
    const { openModal } = React.useContext(ModalDispatch);

    useEffect(() => {
      if (imageRef.current && imageRef.current.complete) setLoading(false);
    }, []);

    return (
      <div
        style={{
          left: initPosition.x,
          top: initPosition.y,
          width: `${width}px`,
          transition: 'top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)	',
        }}
        className={`movable absolute z-${
          levels[level].zindex
        } cursor-pointer shadow-custom duration-500 ${
          loading
            ? 'invisible opacity-0 scale-[0.7]'
            : 'opacity-1 visible scale-[1]'
        }`}
        onClick={() =>
          openModal(
            <div className="h-full w-full">
              <img
                ref={imageRef}
                src={galleryMock[id].src}
                alt="img"
                className="h-full w-full rounded-sm object-contain duration-300"
              />
              <div className="mt-3 flex justify-center">
                <span className="ml-4 text-xs text-white">
                  {galleryMock[id].title}
                </span>
              </div>
            </div>,
          )
        }
      >
        <div ref={ref} className="group relative h-auto w-full">
          <img
            ref={imageRef}
            src={galleryMock[id].src}
            alt="img"
            className="w-full rounded-sm border-8 border-gray-200 object-contain duration-300 group-hover:brightness-75 dark:border-white dark:group-hover:brightness-75"
            onLoad={() => setLoading(false)}
          />
          <div className="h-[5px] w-full bg-gray-400 dark:bg-gray-900" />
        </div>
      </div>
    );
  },
);

export default ImageForm;

'use client';

import { ModalDispatch } from '@/contexts/modalContext';
import { galleryMock } from '@constants/imagesMock';
import React from 'react';

const levels = {
  1: {
    speed: 2,
    zindex: 10,
  },
  2: {
    speed: 1.5,
    zindex: 20,
  },
  3: {
    speed: 1,
    zindex: 30,
  },
};

function getLevel(id: string, index: number) {
  if (id == 'start' || id == 'end') {
    return 3;
  }
  return Math.floor(index % 3) + 1;
}
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
      initPosition: {
        x: number;
        y: number;
      };
      width: number;
    },
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    console.log(width);
    const level = getLevel(id, index) as 1 | 2 | 3;
    const positionRef = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLImageElement>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isTouchMove, setIsTouchMove] = React.useState<boolean>(false);
    const { openModal } = React.useContext(ModalDispatch);

    function handleLoad() {
      setLoading(false);
    }

    const scrollAnimate = (prevY: number) => {
      prevY = prevY ?? 0;
      const setY = document.setY ?? 0;
      const rec = positionRef.current?.getBoundingClientRect();

      if (positionRef.current?.style && rec) {
        if (prevY !== setY) {
          const newTopValue = `${rec.top + -setY * levels[level].speed}px`;
          positionRef.current.style.top = newTopValue;
        }
        requestAnimationFrame(() => scrollAnimate(setY));
      }
    };

    function openDetailModal() {
      openModal(
        <div className="h-full w-full">
          <img
            ref={imageRef}
            src={galleryMock[id].src}
            alt="img"
            className={`h-full w-full rounded-sm
            object-contain duration-300             
          `}
          />
          <div className="mt-3 flex justify-center">
            <span className="ml-4 text-xs text-white">
              {galleryMock[id].title} - {galleryMock[id].date}
            </span>
          </div>
        </div>,
      );
    }

    React.useEffect(() => {
      if (imageRef.current && imageRef.current.complete) handleLoad();
    }, []);

    React.useEffect(() => {
      const requestId = requestAnimationFrame(scrollAnimate);
      return () => cancelAnimationFrame(requestId);
    }, []);

    return (
      <div
        ref={positionRef}
        style={{
          left: initPosition.x,
          top: initPosition.y,
          width: `${width}px`,
        }}
        className={`absolute z-${
          levels[level].zindex
        } cursor-pointer shadow-custom duration-500
      ${
        loading
          ? 'invisible opacity-0 scale-[0.7]'
          : 'opacity-1 visible scale-[1]'
      }`}
        onClick={() => openDetailModal()}
        onTouchMove={() => setIsTouchMove(true)}
        onTouchEnd={() => {
          if (!isTouchMove) {
            openDetailModal();
          }
          setIsTouchMove(false);
        }}
      >
        <div
          {...(ref ? { ref: ref } : {})}
          className="group relative h-auto w-full"
        >
          <img
            ref={imageRef}
            src={galleryMock[id].src}
            alt="img"
            className={`w-full rounded-sm border-8 border-gray-200 
            object-contain duration-300 
            group-hover:brightness-75
            dark:border-white
            dark:group-hover:brightness-75
          `}
            onLoad={() => handleLoad()}
          />
          <div className="h-[5px] w-full bg-gray-400 dark:bg-gray-900" />
          <div
            className="absolute bottom-[15px] w-full duration-300
          group-hover:visible group-hover:opacity-[1] 
          [&:not(:hover)]:invisible [&:not(:hover)]:opacity-0
          "
          >
            <span className="ml-4 text-xs text-white">
              {galleryMock[id].title}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default ImageForm;

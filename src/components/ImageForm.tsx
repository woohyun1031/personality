'use client';

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
    const level = getLevel(id, index) as 1 | 2 | 3;
    const positionRef = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLImageElement>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

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
        }}
        className={`absolute z-${
          levels[level].zindex
        } w-[${width}px] cursor-pointer shadow-custom duration-500
      ${
        loading
          ? 'invisible opacity-0 scale-[0.7]'
          : 'opacity-1 visible scale-[1]'
      }`}
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
            <span className="ml-4 text-xs text-gray-900 dark:text-white">
              {galleryMock[id].title}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default ImageForm;

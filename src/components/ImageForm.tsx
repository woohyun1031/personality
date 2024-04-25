'use client';

import { ModalDispatch } from '@/contexts/modalContext';
import { imagesMock } from '@constants/imagesMock';
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
    }: {
      id: string;
      index: number;
      initPosition: {
        x: number;
        y: number;
      };
    },
    ref?: React.ForwardedRef<HTMLDivElement>,
  ) => {
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

    function moveDetail() {
      openModal(
        <section className="h-full w-full">
          <div
            className={`flex h-full w-full flex-col justify-center gap-6 sm:flex-row`}
          >
            <div className="h-auto max-w-[500px]">
              <img
                src={imagesMock[id]}
                alt="img"
                className={`
                h-full w-full rounded-sm 
                object-contain duration-300                                             
            `}
              />
            </div>
            <div className="flex w-[300px] items-center">
              <div className="flex flex-col">
                <div className="text-sm text-white">{'"The GyengJu"'}</div>
                <div className="text-sm text-white">{'2022.10.31'}</div>
              </div>
            </div>
          </div>
        </section>,
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
        }}
        className={`absolute z-${
          levels[level].zindex
        } w-[170px] cursor-pointer shadow-custom duration-500
      ${
        loading
          ? 'invisible opacity-0 scale-[0.7]'
          : 'opacity-1 visible scale-[1]'
      }`}
        onClick={() => moveDetail()}
        onTouchMove={(e) => {
          e.preventDefault();
          setIsTouchMove(true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          if (isTouchMove) {
            setIsTouchMove(false);
          } else {
            moveDetail();
            setIsTouchMove(false);
          }
        }}
      >
        <div
          {...(ref ? { ref: ref } : {})}
          className="group relative h-auto w-full"
        >
          <img
            ref={imageRef}
            src={imagesMock[id]}
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
              2022.10.31 The GyengJu
            </span>
          </div>
        </div>
      </div>
    );
  },
);

export default ImageForm;

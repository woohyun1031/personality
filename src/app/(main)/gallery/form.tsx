'use client';

import { useResize } from '@/hooks/useResize';
import ImageForm from '@components/ImageForm';
import { galleryMock } from '@constants/imagesMock';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Form() {
  const router = useRouter();
  const startRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);

  const isSm = useResize('(min-width: 640px)');
  const isMd = useResize('(min-width: 768px)');
  const isLg = useResize('(min-width: 1024px)');
  const isXl = useResize('(min-width: 1280px)');

  const currentWidthSize = React.useMemo(() => {
    if (isXl || isLg) return 250;
    if (isMd) return 208;
    if (isSm) return 170;
    return 170;
  }, [isSm, isMd, isLg, isXl]);

  React.useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  function setTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    e.preventDefault();
    const mouseMoveHandler = (event: TouchEvent) => {
      event.preventDefault();
      const startRec = startRef?.current?.getBoundingClientRect();
      const endRec = endRef?.current?.getBoundingClientRect();
      const value = (e.touches[0].pageY - event.touches[0].pageY) / 2;
      if (value <= 0 && startRec && startRec.top <= 80) {
        document.setY = value;
      } else if (value >= 0 && endRec && endRec.top >= 270) {
        document.setY = value;
      }
    };
    const mouseUpHandler = (event: TouchEvent) => {
      event.preventDefault();
      document.removeEventListener('touchmove', mouseMoveHandler);
    };
    document.addEventListener('touchmove', mouseMoveHandler);
    document.addEventListener('touchend', mouseUpHandler, { once: true });
  }

  function setMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const mouseMoveHandler = (event: MouseEvent) => {
      event.preventDefault();
      const startRec = startRef?.current?.getBoundingClientRect();
      const endRec = endRef?.current?.getBoundingClientRect();
      const value = (e.pageY - event.pageY) / 2;
      if (value <= 0 && startRec && startRec.top <= 80) {
        document.setY = value;
      } else if (value >= 0 && endRec && endRec.top >= 270) {
        document.setY = value;
      }
    };
    const mouseUpHandler = (event: MouseEvent) => {
      event.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler, { once: true });
  }

  return (
    <div
      className={`relative h-full cursor-grab justify-center overflow-hidden p-[64px]`}
      onTouchStart={setTouchStart}
      onMouseDown={setMouseDown}
    >
      {typeof document !== 'undefined' ? (
        Object.entries(galleryMock).map(([key], idx, array) => {
          const step = Math.ceil((idx + 1) / 3);
          const maxY = 400 * step;
          const minY = 400 * (step - 1);
          const clientWidth = document.body.clientWidth;
          const x = Math.floor(
            Math.random() * (clientWidth - (currentWidthSize + 128)) + 64,
          );
          const y = Math.floor(Math.random() * (maxY - minY) + minY);
          return (
            <ImageForm
              {...(idx === 0
                ? {
                    ref: startRef,
                  }
                : idx === array.length - 1
                ? { ref: endRef }
                : {})}
              key={key}
              id={key}
              index={idx}
              initPosition={{ x, y }}
              width={currentWidthSize}
            />
          );
        })
      ) : (
        <></>
      )}
      <button
        className="w-100 h-100 fixed bottom-10 right-10 z-50 
        rounded px-4 py-2 text-sm text-gray-600 duration-300 
        hover:text-red-500 
        dark:text-white dark:hover:text-red-500 
        "
        onClick={() => router.refresh()}
        onTouchStart={(e) => {
          e.preventDefault();
          router.refresh();
        }}
      >
        reflow
      </button>
    </div>
  );
}

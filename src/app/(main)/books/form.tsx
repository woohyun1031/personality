'use client';

import ImageForm from '@/components/ImageForm';
import { imagesMock } from '@constants/imagesMock';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Form() {
  const router = useRouter();
  const startRef = React.useRef<HTMLDivElement>(null);
  const endRef = React.useRef<HTMLDivElement>(null);

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
        Object.entries(imagesMock).map(([key], idx, array) => {
          const step = Math.ceil((idx + 1) / 3);
          const maxY = 300 * step;
          const minY = 300 * (step - 1);
          const clientWidth = document.body.clientWidth;
          const x = Math.floor(Math.random() * (clientWidth - 208 + 64) + 64);
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
            />
          );
        })
      ) : (
        <></>
      )}
      <button
        className="w-100 h-100 fixed bottom-10 right-10 z-50 rounded border-b-4 
        border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white 
        hover:border-blue-500 hover:bg-blue-400"
        onClick={() => router.refresh()}
      >
        reflow 🚀
      </button>
    </div>
  );
}

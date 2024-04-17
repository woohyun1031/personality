'use client';

import ImageForm from '@/components/ImageForm';
import { imagesMock } from '@constants/imagesMock';
import React from 'react';

export default function Form() {
  React.useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  return (
    <div
      className={`relative h-full cursor-grab justify-center overflow-hidden p-[64px]`}
      onTouchStart={(e) => {
        e.preventDefault();
        const mouseMoveHandler = (event: TouchEvent) => {
          event.preventDefault();
          document.setY = e.touches[0].pageY - event.touches[0].pageY;
        };
        const mouseUpHandler = (event: TouchEvent) => {
          event.preventDefault();
          if ('가능합니다') {
            document.removeEventListener('touchmove', mouseMoveHandler);
          }
        };
        document.addEventListener('touchmove', mouseMoveHandler);
        document.addEventListener('touchend', mouseUpHandler, { once: true });
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        const mouseMoveHandler = (event: MouseEvent) => {
          event.preventDefault();
          if ('가능합니다') {
            document.setY = e.pageY - event.pageY;
          }
        };
        const mouseUpHandler = (event: MouseEvent) => {
          event.preventDefault();
          document.removeEventListener('mousemove', mouseMoveHandler);
        };
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler, { once: true });
      }}
    >
      {Object.entries(imagesMock).map(([key], idx) => {
        const step = Math.ceil((idx + 1) / 3);
        const maxY = 400 * step;
        const minY = 400 * (step - 1);
        const clientWidth = document.body.clientWidth;
        const x = Math.floor(Math.random() * (clientWidth - 272) + 64);
        const y = Math.floor(Math.random() * (maxY - minY) + minY);

        return (
          <ImageForm key={key} id={key} index={idx} initPosition={{ x, y }} />
        );
      })}
    </div>
  );
}

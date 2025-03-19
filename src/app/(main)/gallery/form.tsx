'use client';

import { useResize } from '@/hooks/useResize';
import { galleryMock } from '@constants/imagesMock';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ImageForm from '@components/ImageForm';

export const levels = {
  1: { zindex: 2, speedFactor: 1 },
  2: { zindex: 35, speedFactor: 1.5 },
  3: { zindex: 90, speedFactor: 2 },
  4: { zindex: 120, speedFactor: 2.5 },
  5: { zindex: 300, speedFactor: 3.5 },
};

export const getLevel = (index: number) => ((index % 5) + 1) as 1 | 2 | 3;

export default function Form() {
  const router = useRouter();
  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
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

  const galleryLength = Object.keys(galleryMock).length;

  const totalHeight = Math.max(1000, galleryLength * 100);

  const columns = Math.ceil(Math.sqrt(galleryLength));

  const xSpacing = window.innerWidth / columns;
  const rowSpacing = totalHeight / galleryLength;

  const positionsRef = useRef<{ x: number; y: number }[]>(
    Object.keys(galleryMock)
      .map((_, idx) => ({
        x: xSpacing * (idx % columns) + Math.random() * 100,
        y: rowSpacing * idx + Math.random() * 100,
      }))
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
  );
  const startYRef = useRef<number | null>(null);

  const getBounds = (index: number) => {
    const viewportHeight = window.innerHeight;
    const maxOffset = viewportHeight * 0.2;
    return {
      minY: positionsRef.current[index].y - maxOffset,
      maxY: positionsRef.current[index].y + maxOffset,
    };
  };

  const updatePositions = () => {
    document.querySelectorAll('.movable').forEach((el, index) => {
      (el as HTMLElement).style.top = `${positionsRef.current[index].y}px`;
      (el as HTMLElement).style.left = `${positionsRef.current[index].x}px`;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startYRef.current = e.clientY;

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      if (startYRef.current !== null) {
        const deltaY = event.clientY - startYRef.current;

        positionsRef.current = positionsRef.current.map((pos, index) => {
          const bounds = getBounds(index);
          const level = getLevel(index);
          const speedFactor = levels[level].speedFactor;

          const newY = pos.y + deltaY * speedFactor * 0.2;
          return {
            x: pos.x,
            y: Math.max(bounds.minY, Math.min(newY, bounds.maxY)),
          };
        });

        requestAnimationFrame(updatePositions);
        startYRef.current = event.clientY;
      }
    };

    const onMouseUp = () => {
      startYRef.current = null;
      document.removeEventListener('mousemove', onMouseMove);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <div
      className="relative h-full cursor-grab justify-center overflow-hidden p-[64px]"
      onMouseDown={handleMouseDown}
    >
      {typeof window !== 'undefined' &&
        Object.entries(galleryMock).map(([key], idx, array) => {
          console.log(key);
          return (
            <ImageForm
              key={key}
              id={key}
              index={idx}
              initPosition={positionsRef.current[idx]}
              width={currentWidthSize}
            />
          );
        })}
      <button
        className="w-100 h-100 fixed bottom-10 right-10 z-50 rounded px-4 py-2 text-sm text-gray-600 duration-300 hover:text-red-500 dark:text-white dark:hover:text-red-500"
        onClick={() => router.refresh()}
      >
        reflow
      </button>
    </div>
  );
}

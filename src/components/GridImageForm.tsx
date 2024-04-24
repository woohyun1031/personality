'use client';

import React from 'react';
import { imagesMock } from '@constants/imagesMock';

export default function GridImageForm({
  id,
  isDesktop,
}: {
  id: string;
  isDesktop: boolean;
}) {
  const ref = React.useRef<any>();
  const [gridRowEnd, setGridRowEnd] = React.useState<number>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const isDeskTopSize = React.useMemo(() => isDesktop, [isDesktop]);

  function handleLoad() {
    setLoading(false);
    setGridRowEnd(+ref.current.clientHeight + 32);
  }

  React.useEffect(() => {
    if (ref.current.complete) handleLoad();
  }, [isDeskTopSize]);

  return (
    <div
      style={{
        gridRowEnd: `span ${gridRowEnd}`,
      }}
      className={`h-full w-full cursor-pointer duration-500 ${
        loading
          ? 'invisible opacity-0 scale-[0.7]'
          : 'opacity-1 visible scale-[1]'
      }`}
    >
      <div className="group relative h-auto w-full">
        <img
          ref={ref}
          src={imagesMock[id]}
          alt="img"
          className={`opacity-1 w-[298px] rounded-sm border-8 border-gray-200 
            object-contain duration-300 group-hover:opacity-75 dark:border-white
            dark:group-hover:opacity-65
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
}

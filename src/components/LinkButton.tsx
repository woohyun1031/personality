import React from 'react';
import Link from 'next/link';

export default function LinkButton({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: string;
}) {
  return (
    <span
      className={`common-animation cursor-pointer text-base text-red-400 hover:text-white dark:text-red-400 dark:hover:text-white ${className}`}
    >
      <Link href={url ?? ''} target="_blank">
        {children}
      </Link>
    </span>
  );
}

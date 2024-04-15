import '@styles/globals.css';
import React from 'react';
import { Providers } from './providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="ko" className="h-full w-full scroll-smooth">
      <body className="bg-background common-animation h-full w-full dark:bg-gray-600 ">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

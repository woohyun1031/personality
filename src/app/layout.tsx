import '@styles/globals.css';
import React from 'react';
import Header from '@components/Header';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): React.ReactElement {
  return (
    <html lang="ko" className="h-full w-full scroll-smooth">
      <body className="bg-background h-full w-full bg-gray-600">
        <Header />
        {children}
      </body>
    </html>
  );
}

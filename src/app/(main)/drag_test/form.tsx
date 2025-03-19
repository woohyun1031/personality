'use client';

import React, { useRef, useEffect } from 'react';

const mockImages = [
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+001.jpeg',
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+002.jpeg',
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+004.jpeg',
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+005.jpeg',
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+006.jpeg',
  'https://personality-images.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2024-04-25-18-09-05+007.jpeg',
];

const mockData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  image: mockImages[Math.floor(Math.random() * mockImages.length)],
  x: Math.random() * window.innerWidth * 0.8,
  y: Math.random() * window.innerHeight * 0.8,
}));

export const MovableComponent = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <div
      className="movable"
      style={{
        position: 'absolute',
        width: '220px',
        height: '80px',
        background: '#ffffff',
        color: '#333',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        borderRadius: '12px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'top 0.1s ease-out',
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{name}</span>
    </div>
  );
};

const DraggableContainer = ({ components }: { components: JSX.Element[] }) => {
  const positionsRef = useRef<{ x: number; y: number }[]>(
    mockData.map((user) => ({ x: user.x, y: user.y })),
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrame = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  const updatePositions = () => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      positionsRef.current.forEach((pos, index) => {
        const element = children[index] as HTMLElement;
        element.style.top = `${pos.y}px`;
        element.style.left = `${pos.x}px`;
      });
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    startYRef.current = event.clientY;
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (startYRef.current !== null) {
      const deltaY = event.clientY - startYRef.current;
      positionsRef.current = positionsRef.current.map((pos, index) => ({
        x: pos.x,
        y: pos.y + deltaY * (index + 1) * 0.1,
      }));

      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(() => {
          updatePositions();
          animationFrame.current = null;
        });
      }

      startYRef.current = event.clientY;
    }
  };

  const handleMouseUp = () => {
    startYRef.current = null;
  };

  useEffect(() => {
    updatePositions();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#f0f0f0',
        overflow: 'hidden',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {components}
    </div>
  );
};

const App = () => {
  return (
    <DraggableContainer
      components={mockData.map((user) => (
        <MovableComponent key={user.id} name={user.name} image={user.image} />
      ))}
    />
  );
};

export default App;

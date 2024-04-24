'use client';

import React from 'react';
import { ModalDispatch } from '@contexts/modalContext';

export default function CustomModal({
  content,
}: {
  content: React.JSX.Element;
}) {
  const { modalState, closeModal } = React.useContext(ModalDispatch);

  return (
    <div
      className={`${
        modalState.isShow ? 'opacity-1 visible' : 'invisible opacity-0'
      } fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center 
          bg-[rgba(0,0,0,0.4)] p-20 backdrop-blur-md duration-300`}
      onClick={() => closeModal()}
    >
      {content}
    </div>
  );
}

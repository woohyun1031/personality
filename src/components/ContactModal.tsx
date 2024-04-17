'use client';

import React from 'react';
import { ModalDispatch } from '@contexts/modalContext';
import LinkButton from './LinkButton';
import URL from '@constants/url';

export default function ContactModal() {
  const { modalState, modalDispatch } = React.useContext(ModalDispatch);

  function cancelModal() {
    modalDispatch({ type: 'close' });
  }

  return (
    <>
      {
        <div
          className={`${
            modalState.isShow ? 'opacity-1 visible' : 'invisible opacity-0'
          } fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center 
          bg-[rgba(0,0,0,0.4)] p-20 backdrop-blur-md duration-300`}
          onClick={() => {
            cancelModal();
          }}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="mt-2 text-lg text-white dark:text-white">
                Hello, I'm Woohyun Kim 👋
              </div>
              <div className="mt-2 text-sm text-white dark:text-white">
                I specialize in building features to solve user problems and
                enhancing them technically.
              </div>
              <div className="mt-2 text-sm text-white dark:text-white">
                My primary tools are TypeScript, React.js, and Next.js, but I
                also enjoy working with Vanilla.js on personal projects.
              </div>
              <div className="mt-2 text-sm text-white dark:text-white">
                Lately, I've been immersing myself in both work and hobbies
                related to development.
              </div>
              <div className="mt-2 text-sm text-white dark:text-white">
                I consistently record these experiences and interesting problems
                in
                <LinkButton url={URL.notion} className="ml-2 mr-1">
                  +
                </LinkButton>
                Notion.
              </div>
              <div className="mt-2 text-sm text-white dark:text-white">
                Occasionally, I integrate these notes with my
                <LinkButton url={URL.blog} className="ml-2 mr-1">
                  +
                </LinkButton>
                blog posts, addressing issues I encounter directly.
              </div>

              <div className="mt-12 text-sm">
                <LinkButton url={URL.mail} className="ml-2 mr-1 text-sm">
                  email
                </LinkButton>
                <LinkButton url={URL.github} className="ml-2 mr-1 text-sm">
                  github
                </LinkButton>
                <LinkButton url={URL.blog} className="ml-2 mr-1 text-sm">
                  blog
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

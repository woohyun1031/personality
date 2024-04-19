'use client';

import React from 'react';
import Desk from '@components/Desk';
import { useResize } from '@hooks/useResize';
import MacModal from '@components/MacModal';

export default function Form() {
  const isDesktop = useResize('(min-height: 768px)');
  const isMobile = useResize('(max-height: 600px)');
  const fontSize = isDesktop ? 'text-base' : 'text-xs';
  const [testArray, setTestArray] = React.useState([1, 2, 3, 4, 5]);
  const [new_testArray, setNew_TestArray] = React.useState([98, 1, 2, 3, 4, 5]);

  return (
    <>
      <section className="flex h-screen items-center justify-center p-[5rem] ">
        <div
          className="flex w-full flex-col items-center 
          xl:flex-row xl:justify-center xl:gap-20"
        >
          <Desk />
          <div className="w-full max-w-[600px]">
            <div className="mt-16 h-[270px]">
              <div className={`${fontSize} text-gray-600 dark:text-white`}>
                Through my desk, I'll show you my personality 👋
              </div>

              {isMobile ? (
                <></>
              ) : (
                <>
                  <div
                    className={`mt-10 ${fontSize} text-gray-600 dark:text-white`}
                  >
                    My desk represents my individuality expressed through books,
                    music, movie, and photography. Also, I used programming to
                    express aspects of my life that weren't related to
                    programming 🚀 This project drew much inspiration and
                    influence from Interactive Developer Kim Jongmin's
                    'DESK:where creativity is born' project. <br />
                    I'd like to express my gratitude.
                  </div>
                  <div
                    className={`mt-2 ${fontSize} text-gray-600 dark:text-white`}
                  >
                    Click on each element to see more details.
                  </div>
                  <div
                    className={`mt-2 ${fontSize} text-gray-600 dark:text-white`}
                  >
                    Enjoy it!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <ul className="mr-10">
          {[...testArray].map((v) => {
            return (
              <li
                className="translate-x-5"
                key={v}
                onClick={() => {
                  const newArr = testArray.slice();
                  const newnew = [newArr[4], ...newArr.slice(0, 4)];
                  setTestArray(newnew);
                }}
                // onClick={() => {
                //   const newArr = testArray.slice();
                //   const newnew = [...newArr.slice(1, 5), newArr[0]];
                //   setTestArray(newnew);
                // }}
              >
                {v}
              </li>
            );
          })}
        </ul>

        <ul>
          {[...new_testArray].map((v) => {
            return (
              <li
                className="translate-x-5"
                key={v}
                onClick={() => {
                  const newArr = new_testArray.slice();
                  const newnew = [newArr[0], newArr[5], ...newArr.slice(1, 5)];
                  setNew_TestArray(newnew);
                }}
                // onClick={() => {
                //   const newArr = testArray.slice();
                //   const newnew = [...newArr.slice(1, 5), newArr[0]];
                //   setTestArray(newnew);
                // }}
              >
                {v}
              </li>
            );
          })}
        </ul> */}
      </section>
      <MacModal />
    </>
  );
}

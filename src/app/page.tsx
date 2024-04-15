import BooksIcon from '@images/BooksIcon';
import CdsIcon from '@images/CdsIcon';
import MacIcon from '@images/MacIcon';
import PostitsIcon from '@images/PostitsIcon';
import TableIcon from '@images/TableIcon';
import React from 'react';

export default async function Page() {
  return (
    <section className="flex h-screen items-center justify-center p-[5rem]">
      <div className="flex flex-col">
        <div className="mb-5 flex h-full justify-end pr-6 text-white">
          <PostitsIcon />
        </div>
        <div className="flex h-full w-[550px] items-end justify-center gap-3">
          <div className="h-full w-[170px] text-white">
            <BooksIcon />
          </div>
          <div className="h-full w-[180px] text-white ">
            <MacIcon />
          </div>
          <div className="h-full w-[75px] text-white ">
            <CdsIcon />
          </div>
        </div>
        <div className="flex max-w-[550px] justify-center text-white">
          <TableIcon />
        </div>
      </div>
    </section>
  );
}

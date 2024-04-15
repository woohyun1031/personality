import Image from 'next/image';
import React from 'react';

export default async function Page() {
  return (
    <section className="flex h-screen items-center justify-center p-[5rem]">
      <div className="flex flex-col">
        <div className="mb-5 flex h-full w-full justify-end pr-6">
          <Image
            src={'/images/postits.svg'}
            width={100}
            height={100}
            alt=""
            className="object-fill"
          />
        </div>
        <div className="relative flex h-full w-[550px] items-end justify-center gap-3">
          <div className="h-full">
            <Image
              src={'/images/books.svg'}
              width={170}
              height={100}
              alt=""
              className="object-fill"
            />
          </div>
          <div className="h-full">
            <Image
              src={'/images/mac.svg'}
              width={180}
              height={100}
              alt=""
              className="object-fill"
            />
          </div>
          <div className="h-full">
            <Image
              src={'/images/cds.svg'}
              width={75}
              height={100}
              alt=""
              className="object-fill"
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Image
            src={'/images/table.svg'}
            width={550}
            height={100}
            alt=""
            className="object-fill"
          />
        </div>
      </div>
    </section>
  );
}

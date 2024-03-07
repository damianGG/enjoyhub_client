import Link from 'next/link';
import React from 'react';
import Image from "next/image"
const SideBox = () => {
  return (<>
    <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
      <div className="sticky top-28">
        <div className="listingSectionSidebar__wrap shadow-xl">
          <div className="flex justify-between">
            <span className="text-3xl font-semibold"><span className="ml-1 text-base font-normal text-neutral-500 ">od </span>80 zł<span className="ml-1 text-base font-normal text-neutral-500 ">/osoba</span>
            </span>
            <div className="nc-StartRating flex items-center space-x-1 text-sm  " data-nc-id="StartRating">
              <div className="pb-[2px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px] text-orange-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                </svg>
              </div>
              <span className="font-medium ">4.5</span>
              <span className="text-neutral-500 ">(112)</span>
            </div>
          </div>
          <div className="border-b border-neutral-200 "></div>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between text-neutral-6000 ">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <span className="text-xs">
                  min. liczba osób
                </span>
              </span>
              <span className="self-center">+ 3</span>
            </div>
            <div className="flex justify-between text-neutral-6000 ">
              <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 lg:w-7 lg:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
              </svg>
                <span className="text-xs">
                  min. wiek uczestnika
                </span>
              </span>
              <span className="self-center">+ 16</span>
            </div>
            <div className="flex justify-between text-neutral-6000 ">
              <span> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
                <span className="text-xs">
                  czas zabawy
                </span>
              </span>
              <span className="self-center">120 min</span>
            </div>
            <div className="border-b border-neutral-200 "></div>
          </div>
          {/* Dni otwarcia i godziny dz iałania */}
          <div className="text-neutral-6000">
            <span className="font-semibold">Dni otwarcia i godziny</span>
            <div className="mt-2">
              <span>Poniedziałek - Piątek: 10:00 - 22:00</span>
              <br />
              <span>Sobota - Niedziela: 12:00 - 24:00</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="text-neutral-6000">
              <span className="font-semibold">Kontakt</span>
              <div className="mt-2">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline mr-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                  +48 123 456 789</span>
                <br />
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 inline mr-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                </svg>
                  kontakt@example.com</span>
              </div>
            </div>
          </div>
          <span className="font-semibold">Sprawdź nasze socialmedia</span>
          <div className="flex gap-10">
            <Link href=""><Image src="/instagram.webp" alt="instagram-logo" width={50} height={50} /></Link>
            <Link href=""><Image src="/tiktok_logo.png" alt="tiktok-logo" width={50} height={50} /></Link>
            <Link href=""><Image src="/facebook_logo.webp" alt="facebook-logo" width={50} height={50} /></Link>

          </div>
        </div>
      </div>
    </div>
  </>

  );
};

export default SideBox;

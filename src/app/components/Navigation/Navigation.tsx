'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation'


import aim from './icons/aim.png'
import exit from './icons/exit.png'
import jumper from './icons/jumper.png'
import karting from './icons/karting.png'
import offRoad from './icons/off-road.png'
import paintballGun from './icons/paintball-gun.png'
import quad from './icons/quad.png'
import { useEffect } from 'react';

function Navigation() {


    const router = useRouter();

    return (
        <div className="relative overflow-hidden bg-white mb-10 mt-2">
            <div className="flex items-center justify-center">
                {/* <button className="p-2">
                    <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
                </button> */}

                <div className="flex overflow-x-scroll hide-scrollbar  p-2 items-center gap-10">

                    <Link href="/paintball" shallow={true}>
                        <div className="flex flex-col items-center">
                            <Image
                                src={paintballGun}
                                alt="aim"
                                width={50}
                                height={50}
                            />
                            <span className='text-sm'>Paintball</span>
                        </div>
                    </Link>


                    <Link href="/quady" shallow={true}>
                        <div className="flex flex-col items-center">
                            <Image
                                src={quad}
                                alt="aim"
                                width={50}
                                height={50}
                            />
                            <span className='text-sm'>Quady</span>
                        </div>
                    </Link>

                    <Link href="/gokarty" shallow={true}>
                        <div className="flex flex-col items-center">
                            <Image
                                src={karting}
                                alt="gokart"
                                width={50}
                                height={50}
                            />
                            <span className='text-sm'>Gokarty</span>
                        </div>
                    </Link>
                </div>

                {/* <button className="p-2">
                    <ChevronRightIcon className="h-6 w-6 text-gray-500" />
                </button> */}
            </div>
        </div>
    );
}

export default Navigation; 
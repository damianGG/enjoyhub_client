import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ButtonCTA from '@/components/ButtonCTA'
import HamburgerMenu from '@/components/HamburgerMenu';
import HamburgerMenuDropdown from '../HamburgerMenuDropdown';
import Link from 'next/link';


function Header() {
    return (
        <header className="flex justify-between sticky top-0 z-5 bg-white p-5 md:px-10">

            {/* Lewa strona */}
            {/* Logo */}
            <div className="flex items-center">
                <div className="relative w-24 h-10 cursor-pointer my-auto">
                    <Link href={"/all"}>
                        <h1>EnjoyHub</h1>
                    </Link>
                </div>
            </div>

            {/* Wyszukiwarka */}
            {/* <div className="flex items-center max-w-2xl">
                <div className="flex-grow md:inline-flex items-center border-2 rounded-full py-2 px-3 shadow-sm w-full">
                    <input
                        className="flex-grow outline-none bg-transparent w-full"
                        type="text"
                        placeholder="Rozpocznij wyszukiwanie"
                    />
                    <MagnifyingGlassIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
                </div>
            </div> */}


            {/* Prawa strona */}
            <div className="flex space-x-4 items-center text-gray-500">
                <ButtonCTA />
                <HamburgerMenuDropdown />
            </div>
        </header>
    );
}

export default Header;
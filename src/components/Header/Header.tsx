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
                        <Image
                            src="/logo.png"
                            layout="fill"
                            objectFit="contain"
                            objectPosition="left" alt={'Logo'} />
                    </Link>
                </div>
            </div>

            {/* Wyszukiwarka */}

            {/* Prawa strona */}
            <div className="flex space-x-4 items-center text-gray-500">
                <ButtonCTA />
                <HamburgerMenuDropdown />
            </div>
        </header>
    );
}

export default Header;
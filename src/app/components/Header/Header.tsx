import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function Header() {
    return (
        <header className="flex justify-between sticky top-0 z-50 bg-white shadow-md p-5 md:px-10">

            {/* Lewa strona */}
            {/* Logo */}
            <div className="flex items-center">
                <div className="relative w-24 h-10 cursor-pointer my-auto">
                    <h1>EnjoyHub</h1>
                </div>
            </div>

            {/* Wyszukiwarka */}
            <div className="flex items-center max-w-2xl">
                <div className="flex-grow md:inline-flex items-center border-2 rounded-full py-2 px-3 shadow-sm w-full">
                    <input
                        className="flex-grow outline-none bg-transparent w-full"
                        type="text"
                        placeholder="Rozpocznij wyszukiwanie"
                    />
                    <MagnifyingGlassIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
                </div>
            </div>


            {/* Prawa strona */}
            <div className="flex space-x-4 items-center text-gray-500">
                <p className="hidden md:inline cursor-pointer">Zostań gospodarzem</p>
                <div className="p-2 border-2 rounded-full">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </div>
                <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
                    <span className="cursor-pointer">Zaloguj się</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
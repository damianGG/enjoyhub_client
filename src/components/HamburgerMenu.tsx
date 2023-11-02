"use client"


import React, { useState, useEffect, useRef } from 'react';

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative flex items-center justify-center p-2 border-2 rounded-full w-11 h-11">
            <button onClick={toggleMenu} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 py-2 bg-white border shadow-xl top-10 rounded-2xl opacity-100 translate-y-0">
                    <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Zaloguj się</a>
                    <a href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">O nas</a>
                    <a href="/add-location" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dodaj miejsce rozrywki</a>
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;
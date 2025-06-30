import React, { useState } from 'react';
import logo from "./assets/logo.png"
const Header = () => {
        const [open, setOpen] =useState(false)

    return (
        <nav className="flex w-[1440px] items-center justify-between mx-auto  xl:px-32 py-4 border-b border-gray-100 bg-white relative transition-all">

            <a href="/">
                <img className="h-9" src={logo} alt="Logo" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
 

                <button className="cursor-pointer px-6 py-2  hover:bg-blue-600 hover:text-white transition text-black border border-[#E0E0E0] rounded-lg font-medium">
                    Exit
                </button>
            </div>

        

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          
                <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </button>
            </div>

        </nav>
    );
};

export default Header;
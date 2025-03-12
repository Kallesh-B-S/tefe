"use client"

import Image from "next/image";

const Navbar = ()=>{
    return(
        <div className="navbar sticky top-0 h-[100px] md:h-[80px] w-full flex justify-center items-center md:justify-start md:space-x-10 bg-[#FFFFFF] select-none">
          <div className="navbarIcom block md:hidden absolute top-10 left-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="#5c7b7d" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <div className="navbarImage w-[60px] h-[60px] md:ml-10 xl:ml-32">
            <Image src={"/img/landingPage/uscib_logo_green_type2-square.jpg"} alt="" className="w-full h-full" />
          </div>
          <div className="navbarItems hidden md:block md:flex-grow md:justify-end font-oswald tc1 text-[15px] font-extrabold">
            <div className="flex justify-end space-x-10 pr-10 xl:pr-32">
              <div className="!cursor-pointer">Home</div>
              <div className="!cursor-pointer">About</div>
            </div>
          </div>
        </div>
    )
}

export default Navbar;
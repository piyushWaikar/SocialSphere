'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const MobileMenu = () => {
    const [open, setIsOpen] = useState(false);
  return (
    <div className='md:hidden'>
        <div className='flex flex-col gap-[4.5px] cursor-pointer' onClick={()=>setIsOpen((prev)=>!prev)}>
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open ? 'rotate-45 origin-left':''} ease-in-out duration-500`}/>
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open ? 'opacity-0':''} ease-in-out duration-500`}/>
            <div className={`w-6 h-1 bg-blue-500 rounded-sm ${open ? '-rotate-45 origin-left ':''} ease-in-out duration-500`}/>
        </div>
        {open && (
            <div className='absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 z-10 font-medium text-xl'>
                <Link href='/'>Home</Link>
                <Link href='/'>Friends</Link>
                <Link href='/'>Groups</Link>
                <Link href='/'>Stroies</Link>
                <Link href='/'>Login</Link>
            </div>
        )}
    </div>
  )
}

export default MobileMenu
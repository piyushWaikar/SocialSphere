import Image from 'next/image'
import React from 'react'

const Comments = () => {
  return (
    <div>
        {/* WRITE  */}
        <div className='flex items-center gap-4'>
            <Image src='https://images.pexels.com/photos/28000979/pexels-photo-28000979/free-photo-of-tourists-walking-in-ruins-of-library-of-celsus-in-anatolia-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' width={32} height={32} className='w-8 h-8 rounded-full'/>
            <div className='flex flex-1 items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full'>
                <input type="text" placeholder='Write a comment ...' className='bg-transparent outline-none' />
                <Image src='/emoji.png' alt='' width={16} height={16} className='cursor-pointer'/>
            </div>
        </div>

        {/* COMMENTS  */}
        <div className=''>
            {/* COMMENT  */}
            <div className='flex gap-4 justify-between mt-6'>
                {/* AVATAR  */}
                <Image src='https://images.pexels.com/photos/28000979/pexels-photo-28000979/free-photo-of-tourists-walking-in-ruins-of-library-of-celsus-in-anatolia-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' alt='' width={40} height={40} className='w-10 h-10 rounded-full'/>

                {/* Desc  */}
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='font-medium'>Bernice Spencer</span>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, sint est nostrum veniam necessitatibus obcaecati! Atque cumque nihil voluptate fugiat?</p>
                    <div className='flex items-center gap-8 text-xs text-gray-500 mt-2'>
                        <div className='flex items-center gap-4'>
                        <Image src='/like.png' alt='' width={12} height={12} className='cursor-pointer w-3 h-3' />
                        <span className='text-gray-300'>|</span>
                        <span className='text-gray-500'>123 Likes</span>
                        </div>
                    <div>Reply</div>
                    </div>
                </div>

                {/* Icon  */}
                <Image src='/more.png' alt='' width={16} height={16} className='cursor-pointer w-4 h-4' />
            </div>
        </div>
    </div>
  )
}

export default Comments
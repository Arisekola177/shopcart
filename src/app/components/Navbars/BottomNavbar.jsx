'use client'
import  menu  from '@/app/Images/menu.svg'
import Image from 'next/image'
import Link from "next/link";



const BottomNavbar = () => {

  return (
    <div className=' bg-[#232F3E] w-full h-10 text-white'>
       <div className='w-10/12 mx-auto'>
          <div className='flex items-center gap-6 py-2'>
             <div className='flex items-center gap-2'>
               <Image
               src={menu}
               alt='menu'
               width={16}
               height={16}
               />
               <p className='xs:text-xs'>All</p>
             </div>
             <Link href='/products'>
             <p className='xs:text-xs'>Products</p>
             </Link>
             <p className='xs:text-xs'>Contact</p>
          
          </div>
       </div>
    </div>
  )
}

export default BottomNavbar
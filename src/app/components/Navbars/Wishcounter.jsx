'use client'
import {FaHeart} from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Wishcounter = () => {
    const wishList = useSelector((state) => state.shop.wishList);
  return (
    <div>
        <div className='relative'>
            <div>
            <FaHeart className="md:text-3xl text-xl text-blue-400" />
            </div>
             <span className='absolute top-[-10px] bg-slate-700 md:text-sm text-xs right-[-10px] h-6 w-6 flex items-center justify-center rounded-full text-white'>
            {wishList.length}
           </span>
        </div>  
    </div>
  )
}

export default Wishcounter
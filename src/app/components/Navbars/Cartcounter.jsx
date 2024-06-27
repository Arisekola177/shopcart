'use client'

import { MdShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Cartcounter = () => {
    const productData = useSelector((state) => state.shop.productData);
  return (
    <div>
        <div className='relative'>
            <div>
            <MdShoppingCart className="md:text-3xl text-xl text-yellow-400" />
            </div>
             <span className='absolute top-[-10px] bg-slate-700 text-xs md:text-sm right-[-10px] h-6 w-6 flex items-center justify-center rounded-full text-white'>
            {productData.length}
           </span>
        </div>  
    </div>
  )
}

export default Cartcounter
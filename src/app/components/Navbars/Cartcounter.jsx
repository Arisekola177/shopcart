'use client'
import {FaShoppingBag} from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Cartcounter = () => {
    const productData = useSelector((state) => state.shop.productData);
  return (
    <div>
        <div className='relative'>
            <div>
            <FaShoppingBag className="md:text-3xl sml:text-2xl text-yellow-400" />
            </div>
             <span className='absolute top-[-10px] bg-slate-700 sml:text-xs md:text-sm right-[-10px] h-6 w-6 flex items-center justify-center rounded-full text-white'>
            {productData.length}
           </span>
        </div>  
    </div>
  )
}

export default Cartcounter
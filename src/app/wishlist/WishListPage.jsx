
'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"
import { FaShoppingBasket, FaArrowAltCircleLeft } from "react-icons/fa";
import { resetWish } from "../redux/shopSlice";
import WishListItems from "./WishListItems";


const WishListPage = () => {
  const wishList = useSelector((state) => state.shop.wishList);
  const dispatch = useDispatch()
  const handleReset = () => {
     const confirmReset = window.confirm  ('Are you sure you want to reset your wishlist?');
     if(confirmReset){
       dispatch(resetWish())
     }
  }
  return (
    <div className="md:w-10/12 xs:w-full mx-auto p-5">
   
       {
        wishList.length > 0 ?
         ( 
           <>
            <div className="bg-white rounded-lg">
               <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
               <p className="md:text-sm xs:text-xs font-semibold text-blue-800">
                WishList
              </p>
              <p className="md:text-sm xs:text-xs font-semibold text-blue-800">Subtotal</p>
              </div>
              <div className="">
                 {
                  wishList.map((product) =>(
                    <div key={product.id} >
                        <WishListItems product={product} />
                    </div>
                  ))
                }
              </div>
              <button
      onClick={handleReset}
      className="text-white xs:text-xs md:text-sm bg-red-500 rounded-md xs:py-1 md:py-2 md:px-3 xs:px-2 xs:mt-5 md:mt-10 hover:bg-red-900 duration-300" >
      reset wish
    </button>
            </div>
           
         </>
        
         )  
         :
         (<div className="col-span-6 min-h-[70vh] text-gray-800 flex flex-col items-center justify-center">
          <FaShoppingBasket className="xl:text-8xl xs:text-3xl mb-2 text-red-900" />
             <h1 className="mb-4 xl:text-4xl xs:text-sm font-semibold">Your Wishlist is Empty!!!</h1>
             <div className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-500 duration-300">
              <FaArrowAltCircleLeft />
              <p className="xs:text-xs cursor-pointer tracking-wide"><Link href={'/'}>Go Shopping</Link></p>
            </div>
         </div>)
       }
   
 
    </div>
  )
}

export default WishListPage

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
    <div className="w-10/12 mx-auto px-6 py-4">
   
       {
        wishList.length > 0 ?
         ( 
           <>
            <div className="bg-white rounded-lg">
               <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1 font-montserrat">
               <p className="text-xl font-semibold text-blue-800">
                WishList
              </p>
              <p className="text-xl font-semibold text-blue-800">Subtitle</p>
              </div>
              <div className="mt-5 mb-5">
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
      className="py-2 px-3 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-800 hover:text-white duration-300"
    >
      reset wish
    </button>
            </div>
           
         </>
        
         )  
         :
         (<div className="col-span-6 min-h-[70vh] text-gray-800 flex flex-col items-center justify-center">
          <FaShoppingBasket className="text-8xl mb-2 text-red-900" />
             <h1 className="mb-4 text-4xl font-montserrat font-semibold">Your Wishlist is Empty!!!</h1>
             <div className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-500 duration-300">
              <FaArrowAltCircleLeft />
              <p className=" cursor-pointer tracking-wide"><Link href={'/'}>Go Shopping</Link></p>
            </div>
         </div>)
       }
   
 
    </div>
  )
}

export default WishListPage
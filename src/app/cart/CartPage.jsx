
'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"
import { resetCart } from "../redux/shopSlice";
import CartItems from "./CartItems";
import { FaShoppingBasket, FaArrowAltCircleLeft } from "react-icons/fa";


const CartPage = ({currentUser}) => {
  const productData = useSelector((state) => state.shop.productData);


  return (
    <div className="w-10/12 mx-auto py-10">
     {
        productData.length > 0 ?
         ( 
           <>
               <CartItems productData={productData} currentUser={currentUser} />
           </>
         )  
         :
         (<div className=" min-h-[70vh] text-gray-800 flex flex-col items-center justify-center">
          <FaShoppingBasket className="xl:text-8xl md:text-6xl xs:text-4xl mb-2 text-red-900" />
             <h1 className="mb-4 xs:text-sm md:text-xl xl:text-4xl font-semibold">Your Cart is Empty!!!</h1>
             <div className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-500 duration-300">
              <FaArrowAltCircleLeft />
              <p className="xs:text-sm cursor-pointer tracking-wide"><Link href={'/'}>Go Shopping</Link></p>
            </div>
         </div>)
       }
    
 
    </div>
  )
}

export default CartPage
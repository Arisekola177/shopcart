
'use client'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux"
import { resetCart } from "../redux/shopSlice";
import CartItems from "./CartItems";
import { FaShoppingBasket, FaArrowAltCircleLeft } from "react-icons/fa";


const CartPage = ({currentUser}) => {
  const productData = useSelector((state) => state.shop.productData);
  const dispatch = useDispatch()
  const handleReset = () => {
     const confirmReset = window.confirm  ('Are you sure you want to reset your cart?');
     if(confirmReset){
       dispatch(resetCart())
     }
  }
  return (
    <div className="w-11/12 mx-auto px-6 py-4">
    
    
       {
        productData.length > 0 ?
         ( 
           <>
               <CartItems productData={productData} currentUser={currentUser} />
               <button onClick={handleReset} className="text-white bg-red-500 rounded-md py-2 px-3 hover:bg-red-900 duration-300">Reset cart</button>

         </>
        
         )  
         :
         (<div className=" min-h-[70vh] text-gray-800 flex flex-col items-center justify-center">
          <FaShoppingBasket className="text-8xl mb-2 text-red-900" />
             <h1 className="mb-4 text-4xl font-montserrat font-semibold">Your Cart is Empty!!!</h1>
             <div className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-500 duration-300">
              <FaArrowAltCircleLeft />
              <p className=" cursor-pointer tracking-wide"><Link href={'/'}>Go Shopping</Link></p>
            </div>
         </div>)
       }
    
 
    </div>
  )
}

export default CartPage
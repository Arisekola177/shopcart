
'use client'
import Link from "next/link";
import {  useSelector } from "react-redux"
import CartItems from "./CartItems";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Image from "next/image";
import trolley from '../Images/trolley.jpeg'

const CartPage = ({currentUser}) => {
  const productData = useSelector((state) => state.shop.productData);


  return (
    <div className="md:w-10/12 xs:w-full mx-auto p-5">
     {
        productData.length > 0 ?
         ( 
           <>
               <CartItems productData={productData} currentUser={currentUser} />
           </>
         )  
         :
         (<div className=" min-h-[70vh] text-gray-800 flex flex-col items-center justify-center">
        <div className="xs:w-24 md:w-32">
           <Image src={trolley} alt="trolley" width={200} height={200} className="object-contain" />
         </div>
          <div>
             <h1 className="mb-4 xs:text-sm md:text-xl xl:text-4xl font-semibold">Your Cart is Empty!!!</h1>
             <div className="flex items-center justify-center gap-2 hover:underline hover:underline-offset-4 hover:text-blue-500 duration-300">
              <FaArrowAltCircleLeft />
              <p className="xs:text-xs cursor-pointer tracking-wide"><Link href={'/'}>Go Shopping</Link></p>
            </div>
            </div>
         </div>)
       }
    
 
    </div>
  )
}

export default CartPage
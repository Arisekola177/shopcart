'use client'
import Link from "next/link"
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { useRouter } from "next/navigation"
const page = () => {
  
  const router = useRouter()
  return (
    <div className="flex flex-col gap-2 items-center justify-center py-20">
      <h1 className="text-2xl font-semibold text-green-500">
        Your payment is successful !!!
      </h1>
      <h1 className="text-2xl mt-8 font-semibold">
        Thank you for shopping from shopcart
      </h1>
      <Link
        className="text-sm mt-10 text-gray-500 hover:underline underline-offset-4 decoration-[1px] hover:text-blue-600 duration-300"
        href={"/"}>
        <p className="flex items-center gap-2"><span><FaArrowAltCircleLeft /></span>Continue Shopping</p>
      </Link>
      <div className="mt-5 bg-black text-white rounded-md py-2 px-4">
        <button onClick={() => router.push('/orders')}>View orders</button>
      </div>
    </div>
  )
}

export default page
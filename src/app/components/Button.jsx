"use client"
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"
const Button = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
    
    <div onClick={() => (signIn('google')) } className="flex py-3 bg-red-500 text-white w-full px-2 justify-center items-center gap-3 cursor-pointer border-[1px] border-black rounded-lg hover:bg-red-500 hover:text-white duration-300">
      <FaGoogle/>
      <p className="xs:text-[8px] sm:text-sm">Continue with Google</p>
    </div>
    </div>
  )
}

export default Button
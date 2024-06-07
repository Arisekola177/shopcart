"use client"
import { signIn } from "next-auth/react"
import { FaGithub, FaGoogle } from "react-icons/fa"
const Button = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
    <div onClick={() => (signIn('github')) } className="flex py-3 w-full px-2 justify-center items-center gap-3 cursor-pointer border-[1px] border-black rounded-lg hover:bg-slate-800 hover:text-white duration-300">
      <FaGithub/>
      <p>Continue with Github</p>
    </div>
    <div onClick={() => (signIn('google')) } className="flex py-3 w-full px-2 justify-center items-center gap-3 cursor-pointer border-[1px] border-black rounded-lg hover:bg-red-500 hover:text-white duration-300">
      <FaGoogle/>
      <p>Continue with Google</p>
    </div>
    </div>
  )
}

export default Button
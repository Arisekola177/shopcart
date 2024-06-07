'use client'
import Image from 'next/image'
import payment from '../Images/payment.png'
import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { motion } from "framer-motion";
import { useState } from 'react';
import { AiOutlineCopyright } from 'react-icons/ai'

const Footer = () => {

  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (

    <div className='w-full bg-[#131921]'>
       <div className='w-10/12 mx-auto grid xs:grid-cols-1 md:grid-cols-6 gap-3 py-12'>
         <div className='col-span-2 flex flex-col gap-6 xs:items-center md:items-start '>
             <Link href='/'>
             <h1 className="font-bold text-xl tracking-wide text-blue-600 cursor-pointer">SHOP<span className="text-yellow-400">CART</span></h1>
             </Link>
             <p className='text-white text-xs xs:mx-auto md:mx-0 w-[80%]'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sint ab ullam, numquam nesciunt in</p>
             <div className='flex items-center gap-2'>
               <FaGithub className='text-gray-400 text-xl' />
               <FaTwitter className='text-gray-400 text-xl' />
               <FaLinkedin className='text-gray-400 text-xl' />
             </div>
         </div>
         <div className='col-span-2 text-white xs:mx-auto md:mx-0 xs:py-4 md:py-0 grid grid-cols-2 xs:gap-10 md:gap-6'>
         <div className=''>
            <h2 className='md:text-lg xs:text-sm mb-4'>Shop</h2>
          <ul className="flex flex-col gap-2">
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Accesories
            </li>
            <li className=" text-xs  hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Clothes
            </li>
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Electronics
            </li>
            <li className=" text-xs  hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Home appliances
            </li>
            <li className=" text-xs  hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              New Arrivals
            </li>
          </ul>
        </div>
        <div className=''>
          <h2 className='md:text-lg xs:text-sm mb-4'>Your Account</h2>
          <ul className="flex flex-col gap-2">
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Profile
            </li>
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Orders
            </li>
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Addresses
            </li>
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Account Details
            </li>
            <li className=" text-xs hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Payment Options
            </li>
          </ul>
        </div>
        </div>
        <div className="col-span-2 flex flex-col px-4 xs:items-center md:items-start">
        <h2 className='text-white mb-4 xs:text-lg md:text-xl'>Subscribe to our Newsletter</h2>
          <div className="w-full">
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center xs:text-sm md:text-lg font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 xs:text-xs md:text-lg placeholder:md:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white xs:w-full md:w-[30%] h-10 rounded-lg shadow-lg hover:bg-black hover:text-white duration-300 xs:text-xs md:text-sm tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[100%] lg:w-[80%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              src={payment}
            />
          </div>
        </div>
    
       </div>
       <div className="w-full text-white group">
      <div className="md:max-w-container xs:w-full mx-auto border-t-[1px] pt-10 pb-20">
        <p className=" font-normal text-center flex md:items-center justify-center  duration-200 text-xs">
          <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>
          Copyright 2024 | ShopCart | All Rights Reserved
          <a href="" target="_blank" rel="noreferrer">
          </a>
        </p>
      </div>
    </div>
     
    </div>
  )
}

export default Footer
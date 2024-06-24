'use client'
import {FaBars, FaTimes} from 'react-icons/fa'
import Link from "next/link";
import Wishcounter from './Wishcounter';
import Cartcounter from './Cartcounter';
import User from './User';
import SearchInput from '../SearchInput';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


const Navbar =  () => {

  const [showMenu, setShowMenu] = useState(false);
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

 const handleNav = () => {
  setShowMenu(!showMenu)
 } 
 useEffect(() => {
  if (session?.user) {
    setCurrentUser(session.user);
  }
}, [session]);


  return (
    <div className='w-full bg-[#131921] sticky top-0 z-50 backdrop-blur-2xl  transition-colors'>
      <div className='md:w-10/12 xs:w-full mx-auto xs:px-2 md:px-0 py-4 flex justify-between items-center gap-4'>
        <div className='flex items-center gap-2'>
        <div onClick={handleNav} className='block md:hidden'>
          {
            showMenu ? (null) : ( <FaBars className='text-white' />)
          }
            <div className={`absolute z-[50] top-5 left-0 w-[80%] bg-white transition-all duration-500 ease-in-out px-3 py-4 ${showMenu ? 'left-0 ':'left-[-490px]'}`}>
            
              <div className='flex justify-between'>
                 <div className='flex flex-col gap-4'>
                 <div className='p-4 '>
                 <Link href='/'>
                   <h1 className="text-xs font-semibold mb-2 text-blue-600 cursor-pointer">
                     SHOP<span className="text-yellow-400">CART</span>
                    </h1>
                 </Link>
                 <p className='text-xs'>Your one stop gadget shop</p>
                 </div>
                 <div className='flex flex-col gap-4 px-4 py-2'>
                 <Link className='text-xs' href='/'>Home</Link>
                 <Link className='text-xs' href='/products'>Products</Link>
                 <Link className='text-xs' href='/about'>About</Link>
                 <Link className='text-xs' href='/contact'>Contact</Link>
                 <Link className='text-xs' href='/login'>Login</Link>
                 <Link className='text-xs' href='/register'>Register</Link>
                 </div>
                 <div className='grid grid-cols-2 gap-4'>
                 <div className="px-4 py-2">
                <h1 className="text-sm font-semibold">Category</h1>
                <div className="mt-2 flex flex-col items-start gap-4">
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Headphones</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Tablets</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Smart Watch</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Chair</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Phones</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Keyboard</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Mouse</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Laptop</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Monitor</p>
                </div>
             </div>
             <div className="px-4 py-2">
                <h1 className="text-sm font-semibold">Brand</h1>
                <div className="mt-2 flex flex-col items-start gap-4">
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Samsung</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Apple</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Logitech</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Gtracing</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Redragon</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Hp</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Manhattan</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Tecknet</p>
                  <p className="cursor-pointer text-xs hover:text-black hover:scale-x-95 duration-200">Zihnic</p>
                
                </div> 

             </div>
                 </div>

                
                 </div>
                 <div className='px-4 py-2'>
                  {
                     showMenu ? (  <FaTimes className='text-black' />) : ( null)
                  }
                 </div>
              </div>
          
          
            </div>
        
         
         </div>
          <Link href='/'>
            <h1 className="sm:font-bold xs:font-semibold xs:text-xs sm:text-sm md:text-xl md:tracking-wide text-blue-600 cursor-pointer">
              SHOP<span className="text-yellow-400">CART</span>
            </h1>
          </Link>
        </div>
         
          <SearchInput />

          <div className="flex items-center gap-6  text-white">
          <Link href='/cart' >
          <Cartcounter />
          </Link>
          <Link href='/wishlist' >
          <Wishcounter />
          </Link>
          </div>
      
            <div className=''>
           <User currentUser={currentUser} />
             </div>
         
      </div>
    </div>
       
     
  );
};

export default Navbar;


       

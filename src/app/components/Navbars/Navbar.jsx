import {FaBars, FaSearch} from 'react-icons/fa'
import Link from "next/link";
import { getUser } from "../../../../actions/getUser";
import Wishcounter from './Wishcounter';
import Cartcounter from './Cartcounter';
import User from './User';



const Navbar = async () => {
  const currentUser = await getUser()
  return (
    <div className='w-full bg-[#131921] sticky top-0 z-50 backdrop-blur-2xl transition-colors'>
      <div className='md:w-10/12 xs:w-full mx-auto xs:px-2 md:px-0 py-4 flex justify-between items-center gap-4'>
        <div>
          <Link href='/'>
            <h1 className="sm:font-bold xs:font-semibold xs:text-xs sm:text-sm md:text-xl md:tracking-wide text-blue-600 cursor-pointer">
              SHOP<span className="text-yellow-400">CART</span>
            </h1>
          </Link>
        </div>
        <div className="hidden sm:block relative md:flex-grow ">
          <input 
          className="rounded-lg sm:p-1 md:py-3 md:px-2 w-full outline-none hover:outline-yellow-400"
          /> 
          <div className="absolute sm:top-2 sm:right-2 md:top-4 md:right-4">
          <FaSearch className="sm:text-sm md:text-xl" />
          </div>
          </div> 

          <div className="hidden sml:flex items-center gap-6  text-white">
          <Link href='/cart' >
          <Cartcounter />
          </Link>
          <Link href='/wishlist' >
          <Wishcounter />
          </Link>
          </div>
      
          <div className='hidden md:block'>
    
         <User currentUser={currentUser} />
        
         </div>
         <div className='block md:hidden'>
          <FaBars className='text-white' />
         </div>
      </div>
    </div>
       
     
  );
};

export default Navbar;


       

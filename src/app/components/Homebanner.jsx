
import lap from '../Images/lap1.jpg';
import wireless from '../Images/wireless-01.png'
import Banner from "./Banner";
import Image from 'next/image';

const Homebanner = () => {
  return (
    <div className="w-full ">
        <div className="md:w-10/12 mx-auto grid xs:grid-cols-1 xl:gap-4 xs:gap-2 xl:grid-cols-3 xs:py-0 md:py-5 xl:py-10 ">
        <div className="col-span-2 w-full h-full">
         <Banner />
      </div>
      <div className="col-span-1 grid grid-cols-2 gap-2 xs:px-2 xl:px-0">

      <div className="grid grid-rows-2 gap-4 ">
         <div className=' bg-yellow-400 flex items-center justify-center relative rounded-lg'>
          <Image 
          src={lap}
          alt='laptop'
          width={100}
          height={100}
         
          />
             <p className='absolute top-4 font-semibold text-white'>Laptops</p>
         </div>
         <div className='bg-red-400   flex items-center justify-center rounded-lg relative'>
         <Image 
          src={wireless}
          alt='watch'
          width={100}
          height={100}
          />
          <p className='absolute top-4 font-semibold text-white'>HeadPhones</p>
         </div>
      </div>
     
      <div className="grid grid-rows-2 gap-4">
      <div className=" flex flex-col items-center text-white bg-blue-500 p-4 text-xs rounded-lg gap-4 ">
        <p>New Arrivals</p>
        <p>Best Sellers</p>
        <p>Special Offfer</p>
        <p>Discount sales</p>
      </div>
      <div className="flex flex-col items-center text-white bg-[#131921] p-6 text-xs rounded-lg gap-4">
      <p>New Arrivals</p>
        <p>Best Sellers</p>
        <p>Special Offfer</p>
        <p>Discount sales</p> 
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Homebanner;





import Image from 'next/image';
import playstation from '../Images/playstation.jpg'
import Link from 'next/link';

const Banner2 = () => {
  return (
  
      <div className="md:w-10/12 xs:w-full mx-auto mt-10 xs:px-4 md:px-0  rounded-lg shadow-xl bg-white grid md:grid-cols-2 xs:grid-cols-1 gap-4 items-center md:h-80 xs:mb-10 md:mb-20 ">
        <div className='col-span-1 p-6'>
        <Image
          src={playstation}
          width={350}
          height={350}
          alt='product of the year'
          className='w-full object-contain inline-block'
        />
        </div>
       
        <div className="col-span-1 text-center xs:py-5 md:py-0">
          <h1 className="lg:text-3xl md:text-sm xs:text-xl font-semibold mb-4  ">
            Product of The year
          </h1>
          <p className="lg:text-base xs:text-xs xs:w-full font-normal lg:max-w-[600px] mr-4">
          Bundle includes Marvel’s Spider-Man 2 full game digital voucher
Includes DualSense Wireless Controller, 1TB SSD, 2 Horizontal Stand Feet, HDMI Cable, AC power cord, USB cable, printed materials, ASTRO’s PLAYROOM (Pre-installed game)
          </p>
             <div className='flex justify-center items-center'>
            <button className=' bg-black text-white rounded-md text-xs py-3 mt-4 px-2' > 
            <Link  href={'/products'}>
            Shop Now
            </Link>
            </button>
            </div>
         
        </div>
      </div>
   
  );
};

export default Banner2;

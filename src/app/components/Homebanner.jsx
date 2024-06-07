

import Banner from "./Banner";

const Homebanner = () => {
  return (
    <div className="w-full h-4/6 ">
        <div className="md:w-10/12 mx-auto grid xs:grid-cols-1 md:gap-4 xs:gap-2  md:grid-cols-3 xs:py-0 md:py-10 ">
        <div className="col-span-2 h-full">
         <Banner />
      </div>
      <div className="col-span-1 grid grid-cols-2 gap-2 xs:px-2 md:px-0">

      <div className=" bg-yellow-600 text-white text-center text-xs p-4 flex flex-col gap-4 rounded-lg">
       <p>All</p>
       <p>Phones</p>
       <p>Laptops</p>
       <p>Monitor</p>
       <p>Watches</p>
       <p>Headphones</p>
       <p>Playstation</p>
       <p>Mouse</p>
       <p>Keyboard</p>
       <p>Chair</p>
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


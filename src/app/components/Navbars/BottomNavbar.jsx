'use client'
import menu from '../../Images/menu.svg'
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import SearchProducts from '../SearchProducts';



const BottomNavbar = () => {

const [allData, setAllData] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [filteredProducts, setFilteredProducts] = useState([]);

const { allProducts } = useSelector((state) => state.shop);

  const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    useEffect(() => {
        setAllData(allProducts);
      }, [allProducts]);
     
  
    useEffect(() => {
      const filtered = allData.filter((item) =>
        item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }, [searchQuery]);


  return (
    <div className='bg-[#232F3E] w-full relative text-white'>
       <div className='w-10/12 mx-auto xs:py-4 md:py-0'>
          <div className='xs:hidden md:flex items-center gap-6 py-2'>
             <div className='flex items-center gap-2'>
               <Image
               src={menu}
               alt='menu'
               width={16}
               height={16}
               />
               <p className='xs:text-xs md:text-base'>Home</p>
             </div>
             <Link href='/products'>
             <p className='xs:text-xs md:text-base'>Products</p>
             </Link>
             <p className='xs:text-xs md:text-base'>Contact</p>
          
          </div>
          <div className="md:hidden xs:block relative z-20 ">
         
          <input
            onChange={handleSearch}
            value={searchQuery}
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base py-2 text-black border-[3px] border-transparent outline-none focus-visible:border-yellow-400"
            type="text"
            placeholder="Search shopcart products"
          />
          <div className="absolute top-3 right-2">
          <FaSearch className="text-sm text-black " />
          </div>
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item) => (
                      <div
                        key={item.id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        onClick={() => setSearchQuery("")}
                       >
                        <SearchProducts item={item} />
                      </div>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing matches with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
          </div> 
       </div>
    </div>
  )
}

export default BottomNavbar
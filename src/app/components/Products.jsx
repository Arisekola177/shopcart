
'use client'

import { useState } from 'react';
import ProductCard from './ProductCard';
import ReactPaginate from 'react-paginate';

const Products = ({ shuffledProductData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8; 

  
  const offset = currentPage * productsPerPage;
  const currentProducts = shuffledProductData.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(shuffledProductData.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-4 xs:gap-2 md:gap-6 lg:gap-2 w-10/12 mx-auto">
        <div className="xs:col-span-4 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xs:gap-2 md:gap-4 py-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white md:w-[200px] xl:w-[250px] w-full md:h-[250px] flex flex-col shadow-lg rounded-tr-lg rounded-tl-lg cursor-pointer relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center my-8">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'flex items-center p-0'}
          pageClassName={'mx-1'}
          pageLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          previousClassName={'mx-1'}
          previousLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          nextClassName={'mx-1'}
          nextLinkClassName={'p-2 border text-xs border-gray-300 rounded-lg cursor-pointer'}
          activeClassName={'bg-blue-500 text-xs text-white rounded-full'}
        />
      </div>
    </div>
  );
};

export default Products;

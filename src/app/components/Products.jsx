'use client'

import ProductCard from "./ProductCard"


const Products = ({shuffledProductData}) => {



  return (
    <div className="w-full h-full ">
       <div className="grid grid-cols-4 gap-6 w-10/12 mx-auto">
        <div className="md:col-span-3 xs:col-span-4 mt-10 grid grid-cols-2  md:grid-cols-3 xs:gap-2 md:gap-4 py-4">
          {
            shuffledProductData.map((product) =>(
              <div key={product.id} className="bg-white md:w-[250px] w-[160px] h-[250px] flex flex-col shadow-lg rounded-tr-lg rounded-tl-lg cursor-pointer relative">
                 
                 <ProductCard  product={product}  />
              
              </div>
            ))
          }
        </div>
       </div>
    </div>
  )
}

export default Products
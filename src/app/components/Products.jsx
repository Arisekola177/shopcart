
import ProductCard from "./ProductCard"

const Products = ({productData}) => {

  return (
    <div className="w-full h-full ">
       <div className="grid grid-cols-4 gap-6 w-11/12 mx-auto">
         <div className="hidden md:block col-span-1 mt-14 rounded-lg h-[400px]">
             <div className=" py-4 px-5">
                <h1 className="text-xl font-semibold">Category</h1>
                <div className="mt-5 py-4 flex flex-col items-start gap-5">
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Headphones</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Tablets</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Smart Watch</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Chair</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Phones</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Keyboard</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Mouse</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Laptop</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Monitor</p>
                </div>
             </div>
             <div className=" py-4 px-5">
                <h1 className="text-xl font-semibold">Brand</h1>
                <div className="mt-5 py-4 flex flex-col items-start gap-5">
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Samsung</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Apple</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Logitech</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Gtracing</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Redragon</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Hp</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Manhattan</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Tecknet</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Zihnic</p>
                  <p className="cursor-pointer hover:text-black hover:font-bold hover:text-xl">Ailihen</p>
                </div> 

             </div>
         </div>
        <div className="col-span-3 mt-10 grid grid-cols-3 gap-4 py-4">
          {
            productData.map((product) =>(
              <div key={product.id} className="bg-white w-[300px] h-auto flex flex-col shadow-lg rounded-tr-lg rounded-tl-lg cursor-pointer relative">
                 
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
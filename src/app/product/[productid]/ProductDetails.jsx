
'use client'

import Image from "next/image";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "@/app/components/FormattedPrice";
import { addToCart, addToWish } from "@/app/redux/shopSlice";
import { FaStar } from "react-icons/fa";



const ProductDetails = ({product}) => {
    
    const dispatch = useDispatch()

    const startArray = Array.from({ length: product.rating }, (_, index) => (
        <span key={index} className="text-yellow-400 ">
          <FaStar />
        </span>
      ))
    
    return (
        <div className="w-full  mb-10">
         <div className="w-8/12 bg-white mx-auto mt-10 p-5 grid grid-cols-2 shadow-xl ">
            <div className="py-6 ">
                    <Image
                        src={product.image}
                        alt="product image"
                        width={400}
                        height={400}
                        className=" max-w-[400] max-h-[400px] object-contain"
                    />
                
            </div>
            <div className="py-6 flex flex-col gap-5">
                <p className="text-2xl font-bold font-montserrat">{product.title}</p>
                <p className="text-sm leading-7 text-gray-600">{product.description}</p>
                <p className="text-sm font-mono">Category: {product.category}</p>
                <p className="text-sm font-mono">Brand: {product.brand}</p>
                <p className="text-sm font-mono ">InStock: { product.inStock ? (<span className="text-green-400">true</span>) : (<span className="text-red-500">false</span>)}</p>
                <div className="flex items-center gap-3">
                   <p className="text-gray-400 line-through "><FormattedPrice amount={product.oldPrice} /></p>
                    <p className="font-bold"><FormattedPrice amount={product.price} /></p>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    {startArray}
                </div>
                <div className="flex gap-4 items-center group">
                    {
                        product.inStock ? ( <div>
                            <button onClick={() => dispatch(addToCart({
                                 id: product.id,
                                 brand: product.brand,
                                 category: product.category,
                                 description: product.description,
                                 image: product.image,
                                 isNew: product.isNew,
                                 oldPrice: product.oldPrice,
                                 price: product.price,
                                 title: product.title,
                                 quantity: 1,
                            })) && toast.success(
                                `${product.title.substring(0, 15)} added successfully!`
                            )} className="bg-black text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-yellow-700">add to cart</button>
                        </div>) : (
                             <div >
                             <button className="">Not In-stock</button>
                         </div>
                        )
                    }
                   
                    <div>
                        <button onClick={() => dispatch(addToWish({
                           id: product.id,
                           brand: product.brand,
                           category: product.category,
                           description: product.description,
                           image: product.image,
                           isNew: product.isNew,
                           oldPrice: product.oldPrice,
                           price: product.price,
                           title: product.title,
                           quantity: 1,
                        })) && toast.success(
                            `${product.title.substring(0, 15)} added successfully!`
                        )} className="bg-yellow-800 text-white font-semibold py-2 px-4 rounded-lg group-hover:bg-black">add to wishlist</button>
                    </div>
                </div>
            </div>
        </div>
        
            
            
            <Toaster />
        </div>
    );
}

export default ProductDetails;


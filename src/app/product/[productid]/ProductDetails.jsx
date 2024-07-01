
'use client'

import Image from "next/image";
import { useDispatch } from "react-redux";
import SetColor from '../../utils/SetColor'
import FormattedPrice from "../../components/FormattedPrice";
import { addToCart, addToWish} from "../../redux/shopSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";



const ProductDetails = ({product}) => {

       const [selectedImage, setSelectedImage ] = useState({
        image: product.images.length > 0 ? product.images[0].image : '',
        color: product.images.length > 0 ? product.images[0].color : '',
        colorCode: product.images.length > 0 ? product.images[0].colorCode : '',
      });
    

const productRating = product.reviews?.length > 0? product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length: 0;

    const handleColorClick = (image, color, colorCode) => {
        setSelectedImage({ image, color, colorCode });
      };

    const dispatch = useDispatch()

    
    return (
        <div className="w-full  mb-10">
         <div className="md:w-8/12 xs:w-10/12  mx-auto mt-10 p-5 grid grid-cols-1 md:grid-cols-2 xs:gap-8 md:gap-0  ">
         <div className="flex py-6 flex-col items-center gap-3">
              <div className="max-w-[300px] place-items-center">

              <Image 
                src={selectedImage.image}
                width={250}
                height={300}
                className="object-contain w-full"
             />
              </div>
              <div className="flex border-[1px] border-gray-500 p-2 rounded-md place-items-center gap-3 mt-4">
              {product.images.map((image, index) => (
              <img
               key={index}
               src={image.image}
               alt={`Color option ${index + 1}`}
               onClick={() => handleColorClick(image.image, image.color, image.colorCode)}
               style={{ width: '60px', height: '60px', cursor: 'pointer', object: 'contain' }}
               className="border-[1px] border-gray-500 rounded-md p-1 hover:scale-105 duration-300"
               />
              ))}
              </div>
             
          </div>
          
            <div className="py-6 flex flex-col gap-5">
                <p className="md:text-2xl xs:text-sm font-bold font-montserrat">{product.name}</p>
              
                      <div className="flex flex-row gap-1 items-center">
                      <p className='text-red-500'><Rating value={productRating} readOnly /></p>
                      <p className='text-yellow-500'> {product.reviews?.length || 0} reviews reviews</p>
                     </div>
                <p className="md:text-sm xs:text-xs text-justify w-full leading-7 text-gray-600">{product.description}</p>
                <p className="text-sm font-mono">Category: {product.category}</p>
                <p className="text-sm font-mono">Brand: {product.brand}</p>
                <p className="text-sm font-mono ">InStock: { product.inStock ? (<span className="text-green-400">true</span>) : (<span className="text-red-500">false</span>)}</p>
                <div className="flex items-center">
                
                    <p className="font-bold"><FormattedPrice amount={product.price} /></p>
                  
                </div>
                <SetColor productImages={product.images}  handleColorClick={handleColorClick} />
               
                <div className="flex gap-2 group w-full">
                    {
                        product.inStock ? ( <div className="">
                            <button onClick={() => dispatch(addToCart({
                                 id: product.id,
                                 name:product.name,
                                 brand: product.brand,
                                 category: product.category,
                                 description: product.description,
                                 selectedImage: selectedImage,
                                 isNew: product.isNew,
                                 oldPrice: product.oldPrice,
                                 price: product.price,
                                 title: product.title,
                                 quantity: 1,
                            })) && toast.success(
                                `${product.name} added successfully!`
                            )} className="bg-black w-full text-white md:font-semibold xs:px-2 py-3 md:px-4 rounded-lg group-hover:bg-yellow-700">Add to cart</button>
                        </div>) : (
                             <div >
                             <button disabled className="bg-black w-full text-red-500 md:font-semibold xs:px-2 py-3 md:px-4 rounded-lg ">Not In-stock</button>
                         </div>
                        )
                    }
                   
                    <div>
                        <button onClick={() => dispatch(addToWish({
                         id: product.id,
                         name:product.name,
                         brand: product.brand,
                         category: product.category,
                         description: product.description,
                         selectedImage: selectedImage,
                         isNew: product.isNew,
                         oldPrice: product.oldPrice,
                         price: product.price,
                         title: product.title,
                         quantity: 1,
                        })) && toast.success(
                            `${product.name} added successfully!`
                        )} className="bg-yellow-800 w-full text-white md:font-semibold xs:px-2 py-3 md:px-4 rounded-lg group-hover:bg-black">Add to wishlist</button>
                    </div>
                </div>
            </div>
        </div>
        
            
            
           
        </div>
    );
}

export default ProductDetails;



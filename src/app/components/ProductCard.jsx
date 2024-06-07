

'use client'
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { addToCart, addToWish } from "../redux/shopSlice";
import { useRouter } from "next/navigation";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <div className="w-72 h-64 flex flex-col group items-center relative">
      
        <div onClick={() => router.push(`/product/${product.id}`)} className="w-full p-3 h-64 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className='w-full object-cover group-hover:scale-110 duration-200 rounded-t-lg'
          />
          {product.isNew && (
            <span className='absolute top-2 right-4 font-medium text-xs py-1 px-3 bg-white rounded-full group-hover:bg-orange-600 group-hover:text-white duration-200'>
              New Arrival
            </span>
          )}
           <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
             onClick={() => dispatch(addToCart({
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
         )}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={() => router.push(`/product/${product.id}`)}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li
             onClick={() => dispatch(addToWish({
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
           )}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
        </div>

      </div>
       
      <div className="w-64 px-3 py-2 flex flex-col gap-2">
        <p>{product.category}</p>
        <h2 className="text-sm font-semibold text-gray-800">{product.title.substring(0, 30)}....</h2>
        <div className="flex items-center gap-3">
          <p className="text-gray-400 line-through">
            <FormattedPrice amount={product.oldPrice} />
          </p>
          <p className="font-bold">
            <FormattedPrice amount={product.price} />
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ProductCard;



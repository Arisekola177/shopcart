

'use client'
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import { useDispatch } from "react-redux";
import { addToWish } from "../redux/shopSlice";
import { useRouter } from "next/navigation";
import { BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineLabelImportant } from "react-icons/md";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  

  return (
    <>
      <div className="flex flex-col group items-center relative">
      
        <div onClick={() => router.push(`/product/${product.id}`)} 
        className="w-full h-24 md:w-36 md:h-36 relative overflow-hidden">
          <Image
           src={product.images[0].image}
            alt={product.title}
            width={200}
            height={200}
            className='w-full h-full object-contain group-hover:scale-110 duration-200 rounded-t-lg'
          />
          {product.isNew && (
            <span className='hidden md:block absolute top-2 right-0 text-xs py-1 px-2 bg-white rounded-full group-hover:bg-orange-600 group-hover:text-white duration-200'>
              New Arrival
            </span>
          )}
           <div className="w-full h-28 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-center justify-center gap-2  px-2 border-l border-r">
            <li
              onClick={() => router.push(`/product/${product.id}`)}
              className="text-[#767676]  text-xs font-normal border-b-[1px] border-b-gray-200  flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-xs">
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
               `${product.name} added successfully!`
           )}
              className="text-[#767676] text-xs font-normal border-b-[1px] border-b-gray-200  flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
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
       
      <div className="w-2/3 mx-auto md:w-52 px-2 flex flex-col py-4 gap-3">
        <p className="text-yellow-400 text-xs ">{product.category}</p>
        <h2 className=" text-sm font-semibold text-gray-800 truncate">{product.name}</h2>
        <div className="flex items-center gap-3">
          <p className="font-bold text-xs ">
            <FormattedPrice amount={product.price} />
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;



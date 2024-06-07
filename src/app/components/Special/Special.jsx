

'use client'
import Slider from "react-slick";
import { newarrival } from "@/app/constants/data";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { BsSuitHeartFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { addToCart, addToWish } from "@/app/redux/shopSlice";
import FormattedPrice from "../FormattedPrice";
import SampleNextArrow from "../SampleNextArrow";
import SamplePrevArrow from "../SamplePrevArrow";

const NewArrival = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="md:w-10/12 w-full mx-auto rounded-lg shadow-xl bg-white py-6">
      <div className="p-6 sm:text-center md:text-start">
        <h2 className="font-semibold xs:text-xl md:text-xl">Special Offer</h2>
      </div>
      <div className="">
      <Slider {...settings}>
        {newarrival.map((product) => (
          <div key={product.id} className="p-4">
            <div className="flex flex-col group items-center relative">
              <div
                onClick={() => router.push(`/product/${product.id}`)}
                className="w-full h-24 md:w-36 md:h-36 relative overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain group-hover:scale-110 duration-200 rounded-t-lg"
                />
                {product.isNew && (
                  <span className="hidden md:block absolute top-0 right-0 text-xs py-1 px-2 bg-white rounded-full group-hover:bg-orange-600 group-hover:text-white duration-200">
                   Special Offer
                  </span>
                )}
                <div className="w-full h-28 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
                  <ul className="w-full h-full flex flex-col items-center justify-center gap-2 px-2 border-l border-r">
                   
                    <li
                      onClick={() =>
                        dispatch(
                          addToCart({
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
                          })
                        ) && toast.success(`${product.title.substring(0, 15)} added successfully!`)
                      }
                      className="text-[#767676] text-xs border-b-[1px] border-b-gray-200  flex items-center justify-start gap-2 hover:cursor-pointer pb-1 pt-1 duration-300 w-full"
                    >
                      Add to Cart
                      <span>
                        <FaShoppingCart />
                      </span>
                    </li>
                    <li
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="text-[#767676] text-xs  border-b-[1px] border-b-gray-200  flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                    >
                      View Details
                      <span className="text-xs">
                        <MdOutlineLabelImportant />
                      </span>
                    </li>
                    <li
                      onClick={() =>
                        dispatch(
                          addToWish({
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
                          })
                        ) && toast.success(`${product.title.substring(0, 15)} added successfully!`)
                      }
                      className="text-[#767676] text-xs border-b-[1px] border-b-gray-200  flex items-center justify-start gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                    >
                      Add to Wish List
                      <span>
                        <BsSuitHeartFill />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-2/3 mx-auto md:w-52 border-[1px] border-t-0 px-2 py-4">
                <p className="text-xs font-mono text-yellow-400">{product.category}</p>
                <h2 className="text-sm font-semibold text-gray-800 truncate py-3">
                  {product.title}
                </h2>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 text-xs line-through">
                    <FormattedPrice amount={product.oldPrice} />
                  </p>
                  <p className="font-bold text-xs ">
                    <FormattedPrice amount={product.price} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      </div>
      <Toaster />
    </div>
  );
};

export default NewArrival;




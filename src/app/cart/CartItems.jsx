
'use client';

import Image from "next/image";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty, deleteItem, resetCart } from "../redux/shopSlice";
import FormattedPrice from "../components/FormattedPrice";
import CartCheckout from "./CartCheckout";
import { FaTimes} from "react-icons/fa";
import { toast } from "react-toastify";

const CartItems = ({ currentUser, productData }) => {

  const dispatch = useDispatch()
  const handleReset = () => {
     const confirmReset = window.confirm  ('Are you sure you want to reset your cart?');
     if(confirmReset){
       dispatch(resetCart())
     }
  }

  return (
    <div className="grid xs:grid-cols-1 gap-4 lg:grid-cols-6">
      <div className="bg-white md:col-span-4 xs:col-span-6 rounded-lg">
        <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
          <p className="md:text-sm xs:text-xs font-semibold text-blue-800">Shopping Cart</p>
          <p className="md:text-sm xs:text-xs font-semibold text-blue-800">Subtotal</p>
        </div>
        <div className="py-3">
          {
            productData.map((product) => {
              const {selectedImage} = product
              return (
            
                <div className="grid xs:grid-cols-1 xs:mb-3 xl:mb-6 xs:gap-2 md:grid-cols-4" key={product.id}>
                <div className="flex gap-2 items-center md:gap-4">
                     <div onClick={() => dispatch(deleteItem(product.id)) && toast.error(`${product.name.substring(0, 15)} removed successfully!`)}
                     className="md:text-sm xs:text-xs  font-medium text-red-400 hover:text-red-600 cursor-pointer duration-300">
                            <FaTimes />
                     </div>
                  <div className="xs:max-w-20 xs:max-h-16 md:max-w-28 md:max-h-28 xl:max-w-32 xl:max-h-32 flex xs:flex-row gap-1 items-center md:flex-col">
                    <Image
                      src={selectedImage.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain aspect-square px-4 rounded-lg"
                    />
                   <p className="md:text-xs xs:text-[8px]  font-semibold">Color:{selectedImage.color}</p>
                  </div>
                </div>
                  <div className="col-span-3 flex items-center rounded-md gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="md:block xs:hidden text-sm font-semibold text-blue-800">{product.name}</p>
                      <p className="xs:block md:hidden md:text-sm xs:text-[10px] font-semibold text-blue-800">{product.name.substring(0, 60)}....</p>
                      <p className="md:block xs:hidden text-sm text-gray-600">{product.description.substring(0, 100)}....</p>
                      <p className="xs:block md:hidden md:text-sm xs:text-[10px] text-gray-600">{product.description.substring(0, 40)}....</p>
                      <div className="flex md:flex-row xs:flex-col items-start md:items-center gap-2">
                        <p className="md:text-sm xs:text-[10px] text-gray-600">
                          Unit Price{" "}
                          <span className="font-semibold md:text-sm xs:text-[10px] text-blue-800">
                            <FormattedPrice amount={product.price} />
                          </span>
                        </p>
                        <div className="flex xs:gap-2 md:gap-6">
                          <div className="flex items-center mt-1 justify-between border border-gray-300 xs:px-2 md:px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                            <span
                              onClick={() =>
                                dispatch(
                                  decreaseQty({
                                    id: product.id,
                                    name:product.name,
                                    brand: product.brand,
                                    category: product.category,
                                    description: product.description,
                                    image: selectedImage.image,
                                    isNew: product.isNew,
                                    oldPrice: product.oldPrice,
                                    price: product.price,
                                    title: product.title,
                                    quantity: 1,
                                  })
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center rounded-full text-xs md:text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                            >
                              -
                            </span>
                            <span className="text-xs md:text-sm">{product.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(
                                  increaseQty({
                                    id: product.id,
                                    name:product.name,
                                    brand: product.brand,
                                    category: product.category,
                                    description: product.description,
                                    image: selectedImage.image,
                                    isNew: product.isNew,
                                    oldPrice: product.oldPrice,
                                    price: product.price,
                                    title: product.title,
                                    quantity: 1,
                                  })
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center rounded-full text-xs md:text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                            >
                              +
                            </span>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                    <div className="md:text-lg xs:text-sm font-semibold">
                      <FormattedPrice amount={product.price * product.quantity} />
                    </div>
                  </div>
                </div>
               
              );
            })
          }
          <div className="xs:mt-5 md:mt-10">
          <button onClick={handleReset} className="text-white xs:text-xs md:text-sm bg-red-500 rounded-md xs:py-1 md:py-2 md:px-3 xs:px-2 hover:bg-red-900 duration-300">Reset cart</button>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 xs:col-span-6 md:py-0 xs:py-4">
        <div className="rounded-lg">
          <div className="border-b-[1px] border-b-gray-400 pb-1">
            <p className="md:text-sm xs:text-xs font-semibold text-blue-800">Checkout</p>
          </div>
          <CartCheckout currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default CartItems;

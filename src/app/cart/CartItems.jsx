
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
    <div className="grid xs:grid-cols-1 md:grid-cols-6">
      <div className="bg-white md:col-span-3 xs:col-span-6 p-4 rounded-lg">
        <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
          <p className="md:text-xl text-sm font-semibold text-blue-800">Shopping Cart</p>
          <p className="md:text-xl text-sm font-semibold text-blue-800">Subtitle</p>
        </div>
        <div className="mt-5 mb-5">
          {
            productData.map((product) => {
              const {selectedImage} = product
              return (
            
                <div className="grid xs:grid-cols-1 py-4 xs:gap-2 md:grid-cols-4" key={product.id}>
                <div className="flex gap-4">
                     <div onClick={() => dispatch(deleteItem(product.id)) && toast.error(`${product.title.substring(0, 15)} removed successfully!`)}
                     className="text-sm pt-2 font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
                            <FaTimes />
                     </div>
                  <div className="w-20 h-20 md:max-w-36 md:max-h-32 flex flex-col">
                    <Image
                      src={selectedImage.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-auto object-contain px-4 rounded-lg"
                    />
                   <p className="text-xs py-2 font-semibold">Color: {selectedImage.color}</p>
                  </div>
                </div>
                  <div className="col-span-3 flex items-center rounded-md gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-blue-800">{product.title}</p>
                      <p className="text-sm text-gray-600">{product.description.substring(0, 100)}....</p>
                      <div className="flex md:flex-row xs:flex-col items-start md:items-center gap-2">
                        <p className="text-sm text-gray-600">
                          Unit Price{" "}
                          <span className="font-semibold text-blue-800">
                            <FormattedPrice amount={product.price} />
                          </span>
                        </p>
                        <div className="flex gap-6">
                          <div className="flex items-center mt-1 justify-between border border-gray-300 px-4 py-1 rounded-full w-28 shadow-lg shadow-gray-300">
                            <span
                              onClick={() =>
                                dispatch(
                                  decreaseQty({
                                    id: product.id,
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
                              className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
                            >
                              -
                            </span>
                            <span>{product.quantity}</span>
                            <span
                              onClick={() =>
                                dispatch(
                                  increaseQty({
                                    id: product.id,
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
                              className="w-6 h-6 flex items-center justify-center rounded-full text-base bg-transparent hover:bg-gray-300 cursor-pointer decoration-purple-300"
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
          <div className="mt-5">
          <button onClick={handleReset} className="text-white bg-red-500 rounded-md py-2 px-3 hover:bg-red-900 duration-300">Reset cart</button>
          </div>
        </div>
      </div>
      <div className="md:col-span-3 xs:col-span-6 p-4">
        <div className="rounded-lg">
          <div className="border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-xl font-semibold text-blue-800">Checkout</p>
          </div>
          <CartCheckout currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default CartItems;

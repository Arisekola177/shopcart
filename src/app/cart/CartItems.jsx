import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { decreaseQty, increaseQty, deleteItem } from "../redux/shopSlice";
import FormattedPrice from "../components/FormattedPrice";
import CartPayment from "./CartPayment";
import { FaTrash } from "react-icons/fa";
const CartItems = ({currentUser}) => {
  const { productData } = useSelector((state) => state.shop);
    const dispatch = useDispatch()
  return (
        <div className="grid grid-cols-6">
           <div className="bg-white col-span-4 p-4 rounded-lg">
               <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1 font-montserrat">
               <p className="text-xl font-semibold text-blue-800">Shopping Cart</p>
                <p className="text-xl font-semibold text-blue-800">Subtitle</p>
              </div>
            <div className="mt-5 mb-5">
          {
            productData.map((product)=>(
               <div className="grid grid-cols-4 gap-4" key={product.id}>
                <div className="w-48 h-48 flex items-center justify-center">
                 <Image
                  src={product.image} 
                 alt={product.title} 
                 width={300} 
                 height={300} 
                 className="w-full h-auto object-cover px-4 rounded-lg" />
                 </div>
         <div className="col-span-3 flex items-center rounded-md px-2 py-3 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-blue-800">{product.title}</p>
          <p className="text-sm text-gray-600">{product.description.substring(0, 100)}....</p>
          <div className="flex items-center gap-2">
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
                        image: product.image,
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
                      image: product.image,
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
            <div
              onClick={() => dispatch(deleteItem(product.id)) && toast.error(
                `${product.title.substring(0, 15)} removed successfully!`)}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
            >
               <FaTrash />
            </div>
          </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          <FormattedPrice amount={product.price * product.quantity} />
        </div>
      </div>
              </div>
              ))
          }
          </div>
          </div>
          <div className="col-span-2 p-4">
          <div className=" rounded-lg">
            <div className=" border-b-[1px] border-b-gray-400 pb-1 font-montserrat">
               <p className="text-xl font-semibold text-blue-800">
                 Checkout
              </p>
             </div>
               <CartPayment currentUser={currentUser} />
            </div>
          </div>
        </div>
  )
}

export default CartItems
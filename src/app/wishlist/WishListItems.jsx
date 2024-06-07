import Image from "next/image"
import { useDispatch } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "../components/FormattedPrice";
import { deleteWish } from "../redux/shopSlice";
import { FaTrash } from "react-icons/fa";

const WishListItems = ({product}) => {
    const dispatch = useDispatch()
  return (
    <div className="rounded-lg flex py-4 ">
       <div className="w-48 h-48 flex items-center justify-center">
      <Image
      src={product.image}
      width={300}
      height={300}
      alt={product.title}
      className="object-cover w-full h-auto px-4 rounded-lg"
      />
     </div>
      <div className=" flex items-center rounded-md px-2 py-3 gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-blue-800">{product.title}</p>
          <p className="text-sm text-gray-600">{product.description.substring(0, 100)}</p>
          <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-blue-800">
              <FormattedPrice amount={product.price} />
            </span>
          </p>
          <div className="flex py-2 items-center gap-6">
          <div>
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
                        )} className="bg-black text-sm text-white p-2 rounded-lg ">Add to cart</button>
                    </div>
            <div
              onClick={() => dispatch(deleteWish(product.id)) && toast.error(
                `${product.title.substring(0, 15)} removed successfully!`)}
              className="flex items-center text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300"
            >
              <FaTrash / >
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold text-amazon_blue">
          <FormattedPrice amount={product.price * product.quantity} />
        </div>
      </div>
      <Toaster /> 
    </div>
  )
}

export default WishListItems
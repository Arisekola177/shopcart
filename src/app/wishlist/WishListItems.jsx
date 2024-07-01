import Image from "next/image"
import { useDispatch } from "react-redux"
import FormattedPrice from "../components/FormattedPrice";
import { addToCart, deleteWish } from "../redux/shopSlice";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const WishListItems = ({product}) => {
    const dispatch = useDispatch()
    const {selectedImage} = product
  return (
    <div className="flex py-4 ">
      <div>
        <div onClick={() => dispatch(deleteWish(product.id)) && toast.error( `${product.name.substring(0, 15)} removed successfully!`)}
              className="text-sm font-medium text-gray-400 hover:text-red-600 cursor-pointer duration-300">
              <FaTimes / >
         </div>
       <div className="w-20 h-20 md:w-28 md:h-28">
      <Image
       src={selectedImage.image}
      alt={product.title}
      width={100}
      height={100}
      className="object-contain w-full h-auto px-4 aspect-square rounded-lg"
      />
     </div>
     </div>
      <div className=" flex items-center rounded-md gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-blue-800">{product.name}</p>
          <p className="text-sm text-gray-600">{product.description.substring(0, 300)}....</p>
        
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">
            Unit Price{" "}
            <span className="font-semibold text-blue-800">
              <FormattedPrice amount={product.price} />
            </span>
          </p>
          <div>
                        <button onClick={() => dispatch(addToCart({
                                id: product.id,
                                name:product.name,
                                brand: product.brand,
                                category: product.category,
                                description: product.description,
                                selectedImage: selectedImage ,
                                isNew: product.isNew,
                                price: product.price,
                                title: product.title,
                                quantity: 1,
                        })) && toast.success(
                            `${product.name.substring(0, 15)} added successfully!`
                        )} className="bg-blue-600 xs:text-xs lg:text-sm text-white p-2 rounded-lg hover:bg-blue-700 ">Add to cart</button>
          </div>
          
          </div>
        </div>
      
        <div className="lg:text-lg xs:text-xs md:text-sm font-semibold ">
          <FormattedPrice amount={product.price * product.quantity} />
        </div>
      </div>
    
    </div>
  )
}

export default WishListItems
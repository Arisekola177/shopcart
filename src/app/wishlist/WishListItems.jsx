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
    <div className="grid xs:grid-cols-1 xs:gap-2 md:grid-cols-4 py-3 ">
      <div className="flex gap-2 items-center md:gap-4 ">
        <div onClick={() => dispatch(deleteWish(product.id)) && toast.error( `${product.name.substring(0, 15)} removed successfully!`)}
              className="md:text-sm xs:text-xs  font-medium text-red-400 hover:text-red-600 cursor-pointer duration-300">
              <FaTimes / >
         </div>
       <div className="xs:max-w-20 xs:max-h-16 md:max-w-28 md:max-h-28 xl:max-w-32 xl:max-h-32 flex xs:flex-row gap-1 items-center md:flex-col">
      <Image
       src={selectedImage.image}
      alt={product.title}
      width={100}
      height={100}
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
          <div className="py-2">
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
                        )} className="text-white xs:text-xs md:text-sm bg-blue-500 rounded-md xs:py-1 md:py-2 md:px-3 xs:px-2 hover:bg-blue-900 duration-300">Add to cart</button>
          </div>
          
          </div>
        </div>
      
        <div className="md:text-lg xs:text-sm font-semibold ">
          <FormattedPrice amount={product.price * product.quantity} />
        </div>
      </div>
    
    </div>
  )
}

export default WishListItems
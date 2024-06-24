
'use client'
import { useRouter } from "next/navigation";
import FormattedPrice from "./FormattedPrice";

const SearchProducts = ({ item }) => {
  const router = useRouter()
  return (
    <div  onClick={() => router.push(`/product/${item.id}`)} className="flex xs:flex-col md:flex-row items-center gap-4 p-4">
      <img className="w-20 h-20 object-contain" src={item.image} alt="productImage" />
      <div className="flex-1">
        <p className="text-xs -mb-1 text-gray-600">
          {item.brand} - {item.category}
        </p>
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-xs text-gray-500">{item.description.substring(0, 100)}...</p>
        <p className="text-sm flex items-center gap-1">
          Price:{" "}
          <span className="font-semibold">
            <FormattedPrice amount={item.price} />
          </span>
          {item.oldPrice > item.price && (
            <span className="text-gray-600 line-through ml-2">
              <FormattedPrice amount={item.oldPrice} />
            </span>
          )}
        </p>
      </div>
      {item.oldPrice > item.price && (
        <div className="text-right px-4">
          <p className="text-base font-semibold animate-bounce text-blue-600">
            Save <FormattedPrice amount={item.oldPrice - item.price} />
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;


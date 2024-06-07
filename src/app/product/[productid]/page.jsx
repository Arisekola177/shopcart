import { productData } from "@/app/constants/data"
import ProductDetails from "./ProductDetails"

const Page = ({ params }) => {
  const { productid } = params; 
  const product = productData.find((item) => item.id === productid); 


  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Page;

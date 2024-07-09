
import ProductDetails from "./ProductDetails";
import Review from "./Review";
import getProductById from '../../../../actions/getProductById'
import Nulldata from "../../components/Nulldata";

import { getUser } from "../../../../actions/getUser";
import Addreviews from "./Addreviews";


const Page = async ({ params }) => {
 
  const { productid } = params; 
  const user = await getUser()
  const product = await getProductById(productid); 

 

  if (!product) {
      return <Nulldata title="No Product found" />;
  }

  return (
    <div>
      <ProductDetails product={product} />
      <div className='flex flex-col mt-20  mb-10 gap-4 w-10/12 mx-auto'>
          <Addreviews product={product} user={user} />
          <Review product={product} />
      </div>
    </div>
  );
};

export default Page;


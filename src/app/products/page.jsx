import Products from "../components/Products"
import { productData } from "../constants/data"


const page = () => {
  return (
    <div>
      <Products productData={productData} />
    </div>
  )
}

export default page
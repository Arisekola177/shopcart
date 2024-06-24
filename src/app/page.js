
import Products from './components/Products'
import getProduct from '../../actions/getProduct'
import Nulldata from "./components/Nulldata";
import Homebanner from "./components/Homebanner";


export default async function Home({ searchParams }) {
  const productData = await getProduct(searchParams);
  
  if (productData.length === 0) {
    return <Nulldata title="Oops! No products found. Click 'All' to clear filters " />;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProductData = shuffleArray(productData); 
  
  return (
    <main className="">
      <Homebanner />
      <div>
      <Products shuffledProductData={shuffledProductData} />
      </div>
     </main>
  );
}
   
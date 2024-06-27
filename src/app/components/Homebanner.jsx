
import ProductNav from './Navbars/ProductNav'
import Banner from "./Banner";


const Homebanner = () => {
  return (
    <div className="w-full py-8 ">
        <div className="md:w-10/12 mx-auto grid xs:grid-cols-1 md:grid-cols-4 gap-4">
        <div className="xs:hidden xl:block col-span-1">
        <ProductNav />
     
      </div>
        <div className="xl:col-span-3 xs:col-span-4 w-full h-full">
         <Banner />
      </div>
     
      </div>
    </div>
  );
};

export default Homebanner;





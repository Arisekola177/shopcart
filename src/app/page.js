

import NewArrival from "./components/NewArrival/NewArrival";
import BestSelling from "./components/BestSelling/BestSelling";
import Icons from "./components/Icons";
import Banner2 from "./components/Banner2";
import Homebanner from "./components/Homebanner";
import Special from "./components/Special/Special";

export default  function Home() {
  
  return (
    <main className="">
      <Homebanner />
       <Icons />
       <NewArrival />
       <Banner2 />
       <BestSelling />
       <Special />
     </main>
  );
}
   
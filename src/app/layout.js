import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import Layout from "./components/Layout";
import Navbar from "./components/Navbars/Navbar";
import Footer from "./components/Footer";
import BottomNavbar from './components/Navbars/BottomNavbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ProductNav from './components/Navbars/ProductNav'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopcart",
  description: "E-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <body className={inter.className}>
         <Layout >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <BottomNavbar />
          
        <div className="flex-grow">
        {children}
        <ToastContainer />
        </div>
        <Footer />
        </div>
         </Layout>
        </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import Layout from "./components/Layout";
import Navbar from "./components/Navbars/Navbar";
import BottomNavbar from "./components/Navbars/BottomNavbar";
import Footer from "./components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shopcart",
  description: "E-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
        <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
         <Layout >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <BottomNavbar />
        <div className="flex-grow">
        {children}
        </div>
        <Footer />
        </div>
         </Layout>
        </body>
    </html>
  );
}

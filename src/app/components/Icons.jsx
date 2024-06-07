import { FaShippingFast, FaMotorcycle, FaClock, FaPhone } from "react-icons/fa"

const Icons = () => {
  return (
    <div className="w-10/12 mx-auto py-6">
        <div className="grid xs:hidden md:grid-cols-4  gap-4">
         <div className="flex items-center gap-2 xs:py-1 sm:px-1 sml:px-0  md:py-2 rounded-lg justify-center bg-[#c457c4]">
          <FaShippingFast />
          <p>Fast Shipping</p>
         </div>
         <div className="flex items-center gap-2 xs:py-1 sm:px-1 sml:px-0  md:py-2 rounded-lg justify-center bg-[#ad3f5b]">
          <FaMotorcycle />
          <p>Free Shipping</p>
         </div>
         <div className="flex items-center gap-2 xs:py-1 sm:px-1 sml:px-0   md:py-2 rounded-lg justify-center bg-[#c4c057]">
          <FaClock />
          <p>Two years warranty</p>
         </div>
         <div className="flex items-center gap-2 xs:py-1 sm:px-1 sml:px-0   md:py-2 rounded-lg justify-center bg-[#37ab56]">
          <FaPhone />
          <p>24/7 service</p>
         </div>
        </div>
    </div>
  )
}

export default Icons
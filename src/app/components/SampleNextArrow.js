import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="md:w-14 md:h-14 xs:w-6 xs:h-6 sm:w-8 sm:h-8 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
      onClick={onClick}
    >
      <span className="md:text-xl xs:text-xs sm:text-sm">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default SampleNextArrow;

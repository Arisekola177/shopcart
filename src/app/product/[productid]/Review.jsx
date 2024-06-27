

import { FaUserCircle } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Rating } from "@mui/material";
import Image from "next/image";

const Review = ({ product }) => {

  if (!product || !product.review || product.review.length === 0) {
    return null;
  }

  return (
    <div className="font-inter max-w-[400px]">
      <h2 className="mb-5 font-bold text-3xl">Reviews</h2>
      {product.review.map((review) => (
        <div className='flex flex-col gap-3' key={review.id}>
          <div className="flex items-center gap-4">
            <div>
              {review.user && review.user.image ? (
                <Image 
                  src={review.user.image}
                  width={30}
                  height={30}
                  alt={`${review.user.firstName} ${review.user.lastName}`}
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <h2 className="font-bold text-lg">
              {review.user ? `${review.user.firstName} ${review.user.lastName}` : "Anonymous"}
            </h2>
            <h2>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</h2>
          </div>
          <Rating value={review.rating} readOnly />
          <div>
            <h2>{review.comment}</h2>
          </div>
          <hr className="border-[1px] border-yellow-400" />
        </div>
      ))}
    </div>
  );
};

export default Review;

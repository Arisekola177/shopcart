

'use client'

import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const Addreviews = ({ product, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      Comment: '',
      rating: 0,
    },
  });

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error('No rating selected');
    }
    const ratingData = {
      rating: data.rating,
      productId: product.id,
      userId: user.id,
      comment: data.Comment,
    };
    axios.post('/api/rating', ratingData)
      .then(() => {
        toast.success('Rating Submitted');
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error('Something went wrong');
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // if (!user || !product) return null;

  // const deliveredOrder = user.orders?.some(order =>
  //   order.products.find(item => item.id === product.id) && order.deliveredStatus === 'delivered'
  // );

  // const userReview = product.review?.find(review => review.userId === user.id);

  // if (userReview || !deliveredOrder) {
  //   return null;
  // }

  return (
    <div className='flex flex-col gap-2 max-w-[500px]'>
      <h2 className='font-bold mb-4 text-xl'>Rate this product</h2>
      <Rating onChange={( newValue) => {
        setCustomValue('rating', newValue);
      }} />

      <textarea
        {...register('Comment', { required: true })}
        disabled={isLoading}
        placeholder='Comment'
        className='border-[1px] rounded-md border-black placeholder:xs px-5 py-4 outline-none'
      />
      {errors.Comment && <span className="text-red-500">This field is required</span>}
      <div className='w-full py-3 flex items-center justify-center rounded-md hover:bg-slate-700 duration-300 bg-slate-900'>
        <button className='w-full text-white' onClick={handleSubmit(onSubmit)}>
          {isLoading ? 'Sending .... ' : 'Rate Product'}
        </button>
      </div>
    </div>
  );
};

export default Addreviews;

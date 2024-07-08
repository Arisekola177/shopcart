'use client'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormattedPrice from "../components/FormattedPrice";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { FaCity } from "react-icons/fa";
import { zodResolver } from '@hookform/resolvers/zod';
import { MdMap, MdMapsHomeWork, MdPhone } from "react-icons/md";
import { loadStripe } from "@stripe/stripe-js";
import { resetCart } from "../redux/shopSlice";
import Link from "next/link";
import { toast } from "react-toastify";


const FormSchema = z.object({
  city:z
  .string()
  .min(2, "City must be atleast 2 characters")
  .max(45, "City must be less than 45 characters"),
  country:z
  .string()
  .min(2, "Country must be atleast 2 characters")
  .max(45, "Country must be less than 45 characters"),
  phone: z.string().nonempty("Line is required."),
  state: z.string().nonempty("State is required."),
 
})

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CartCheckout = ({ currentUser }) => {
  const { productData } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const {register, reset, handleSubmit, formState:{errors}} = useForm({
    resolver: zodResolver(FormSchema)
  })

  useEffect(() => {
    let amt = 0;
    productData.forEach((item) => {
      amt += item.price * item.quantity;
    });
    setTotalAmount(amt);
  }, [productData]);

    const createCheckout = async (formData) => {
      toast('Processing, please wait...... ')
      setLoading(true);
      setError(false);
      if (currentUser) {
        try {
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: productData,
              email: currentUser.email,
              deliveryInfo: formData
            }),
          });

          if (!response.ok) {
            console.error('Error creating checkout:', response.statusText);
            setLoading(false);
            setError(true);
            return;
          }
          
          dispatch(resetCart(productData))
          const data = await response.json();
          
          if (data.id) {
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
            if (error) {
              console.error('Error redirecting to checkout:', error.message);
              setError(true);
            }
          }
        } catch (error) {
          console.error('Unexpected error:', error);
          setError(true);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('User is not authenticated');
        setLoading(false);
        setError(true);
      }

      if (productData.length > 0) {
        createCheckout();
      
        reset()
      }
    };

  return (
    <div className="mt-5 bg-gray-100 rounded-md">
    <form onSubmit={handleSubmit(createCheckout)} className="py-6  ">
      <div className="grid grid-cols-1 items-center xs:gap-2 md:gap-6 ">
    <div className=" md:px-4 xs:px-2 col-span-1">
      <h2 className="uppercase text-xs font-semibold py-2">Delivery information</h2>
    
     <div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
     <input
     {...register("city")}
      type="text"
      placeholder="City"
      className="rounded-lg py-2 px-10 w-full outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500" />
      <FaCity className={`absolute  left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`} />
       {errors.city && (
       <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
       {errors.city.message}
       </div>
        )}
            </div>
           < div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
            <input 
               {...register("state")}
              type="text"
              placeholder="State"
              className="rounded-lg w-full py-2 px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500" />
             <MdMap className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`}/>
             {errors.state && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.state.message}</div>
              )}
             </div>
             < div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
            <input 
               {...register("phone")}
              type="text"
              placeholder="Phone"
              className="rounded-lg w-full py-2 px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500" />
             <MdPhone className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`}/>
             {errors.phone && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.phone.message}</div>
              )}
             </div>
             < div className={`relative w-full ${errors ? 'mb-6' : 'mb-0'}`}>
            <input 
               {...register("country")}
              type="text"
              placeholder="Country"
              className="rounded-lg w-full py-2 px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500" />
             <MdMapsHomeWork className={`absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer`}/>
             {errors.country && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">{errors.country.message}</div>
              )}
             </div>
      </div>

     <div className="col-span-1 px-2 md:px-4">  
      <h2 className="uppercase text-xs font-semibold xs:py-2 md:py-4">Payment Information</h2>
      <p className="border-[1px] border-b"></p>
      <div className="flex justify-between items-center py-4 ">
        <p className="uppercase text-blue-500 md:text-sm xs:text-[10px] font-semibold">sub-total</p>
        <p className="md:text-lg xs:text-[10px] font-semibold">
          <FormattedPrice amount={totalAmount} />
        </p>
      </div>
     </div>
     </div>
      <div className="">
        {currentUser ? (
          <div  className="flex items-center xs:w-full md:w-60 mx-auto"  >
            <button
               disabled={loading}
              className="py-3 px-10 w-full rounded-md text-sm bg-yellow-800 text-white">
              {loading ? 'Processing....' : 'Checkout' }
          </button>
          </div>
        ) : (
          <div className="px-2 py-3 flex xs:w-full md:w-60 mx-auto flex-col gap-3">
            <button onClick={() => {router.push('/login')}} className="py-3 w-full px-10 animate-bounce rounded-md text-sm bg-yellow-800 text-white">
               Click to Login
            </button>
            
          </div>
        )}
      </div>
      </form>
    </div>
  );
};

export default CartCheckout;



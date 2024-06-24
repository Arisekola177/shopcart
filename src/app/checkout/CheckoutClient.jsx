


'use client'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { resetCart, saveOrder } from "../redux/shopSlice";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutClient = ({ currentUser }) => {
  const { productData } = useSelector((state) => state.shop);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const createCheckout = async () => {
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
            }),
          });

          if (!response.ok) {
            console.error('Error creating checkout:', response.statusText);
            setLoading(false);
            setError(true);
            return;
          }

          const data = await response.json();
          setClientSecret(data.clientSecret);

          // Dispatch saveOrder action
          dispatch(saveOrder(productData));

          // Redirect to Stripe checkout if sessionId is provided
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
    };

    if (productData.length > 0) {
      createCheckout();
      dispatch(resetCart(productData))
    }
  }, [productData, currentUser, dispatch]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: 'floating'
    },
  };

  return (
    <div className="w-full">
      {clientSecret && productData && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout</div>}
      {error && <div className="text-center text-rose-500">Something went wrong</div>}
    </div>
  );
};

export default CheckoutClient;




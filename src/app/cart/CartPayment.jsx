
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import FormattedPrice from "../components/FormattedPrice";
import { resetCart, saveOrder } from "../redux/shopSlice";
import Link from "next/link";

const CartPayment = ({ currentUser }) => {
  const { productData } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vat, setVat] = useState(0);

  useEffect(() => {
    let amt = 0;
    productData.forEach((item) => {
      amt += item.price * item.quantity;
    });
    setTotalAmount(amt);
    setVat(amt * 0.075);
  }, [productData]);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  const createCheckout = async () => {
    setLoading(true);
    if (currentUser) {
      const stripe = await stripePromise;
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: productData,
            email: currentUser.email,
          }),
        });

        if (!response.ok) {
          console.error("Error creating checkout:", response.statusText);
          setLoading(false);
          return;
        }

        const data = await response.json();
        await stripe.redirectToCheckout({ sessionId: data.id });
        setLoading(false);
        dispatch(resetCart());
        dispatch(saveOrder());
      } catch (error) {
        console.error("Unexpected error:", error);
        setLoading(false);
      }
    } else {
      console.error("User is not authenticated");
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 w-[350px] p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center px-1 py-4">
        <p className="uppercase text-sm font-semibold">sub-total</p>
        <p className="text-sm font-semibold">
          <FormattedPrice amount={totalAmount} />
        </p>
      </div>
      <div className="flex justify-between items-center px-1 py-4">
        <p className="uppercase text-sm font-semibold">vat @ 7.5%</p>
        <p className="text-sm font-semibold">
          <FormattedPrice amount={vat} />
        </p>
      </div>

      <p className="border-[1px] border-b"></p>
      <div className="flex justify-between items-center px-1 py-4 mt-5">
        <p className="uppercase text-sm font-semibold">total</p>
        <p className="text-sm font-semibold">
          <FormattedPrice amount={totalAmount + vat} />
        </p>
      </div>

      <div>
        {currentUser ? (
          <div>
            <button
              onClick={createCheckout}
              className="py-3 w-full px-10 rounded-md text-sm bg-yellow-800 text-white"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to pay"}
            </button>
          </div>
        ) : (
          <div className="px-2 py-3 flex flex-col gap-3">
            <button className="py-3 w-full px-10 rounded-md text-sm bg-yellow-800 text-white">
              <Link href={"/login"}>Login to checkout</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPayment;


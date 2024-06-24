'use client'

import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/shopSlice";
import FormattedPrice from "../components/FormattedPrice";

const CheckoutForm = ({createCheckout}) => {
    const { productData } = useSelector((state) => state.shop);
    const [loading, setLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [vat, setVat] = useState(0);

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        let amt = 0;
        productData.forEach((item) => {
          amt += item.price * item.quantity;
        });
        setTotalAmount(amt);
        setVat(amt * 0.075);
      }, [productData]);

      useEffect(() => {
        if(!stripe){
            return
        }
      }, [stripe]);


  return (
    <form onSubmit={createCheckout} id="payment-form">
        <div> <h2>Enter your details to complete the checkout</h2></div>
        <h2>Address Information</h2>
        <AddressElement options={{mode: 'shipping', allowedCountries: ['US', 'UK', 'NGA', 'CAD']}} />
        <h2>Payment Information</h2>
        <PaymentElement id="payment-element" options={{layout: 'tabs'}} />
        <div>
            Total:   <FormattedPrice amount={totalAmount + vat} />
        </div>
        <button onClick={() => {}} disabled={loading  || !stripe || !elements}>
        {loading ? "Processing..." : "Proceed to pay"}
        </button>
    </form>
  )
}

export default CheckoutForm
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Checkout from "../pages/Checkout";

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await axios.get("http://localhost:4000/config");
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
        // console.log(publishableKey);
      } catch (error) {
        console.error(error);
      }
    }
    fetchConfig();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.post(
          "http://localhost:4000/create-payment-intent",
          {}
        );
        const { clientSecret } = result.data;
        setClientSecret(clientSecret);
        console.log(clientSecret);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </div>
  );
};

export default Payment;

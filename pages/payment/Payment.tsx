import { MouseEventHandler, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { CheckoutWizard, Layout, useToast } from "components";
import { Store } from "utils";

export default function Payment(): JSX.Element {
  const router = useRouter();
  const toast = useToast();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const PAYMENT_METHODS = ["PayPal", "Stripe", "CashOnDelivery"];
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
      return;
    }

    setSelectedPaymentMethod(paymentMethod || "");
  }, [shippingAddress, router, paymentMethod, setSelectedPaymentMethod]);

  const submitHandler = () => {
    if (!selectedPaymentMethod) {
      return toast.pushError("A payment method is required.");
    }

    toast.pushInfo("Saving your payment method...");
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/place-order");
  };

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md">
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {PAYMENT_METHODS.map((payment: string) => (
          <div key={payment} className="mb-4">
            <input
              id="payment"
              name="paymentMethod"
              type="radio"
              className="p-2 outline-none focus:ring-0"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            className="default-button"
            onClick={() => router.push("/shipping")}
          >
            Back
          </button>
          <div className="primary-button" onClick={submitHandler}>
            Next
          </div>
        </div>
      </form>
    </Layout>
  );
}

Payment.displayName = "Payment";

Payment.auth = true;

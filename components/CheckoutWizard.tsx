import React from "react";

interface CheckoutWizardProps {
  activeStep: number;
}

export const CheckoutWizard = ({ activeStep = 0 }: CheckoutWizardProps) => {
  const paymentSteps = [
    "User Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];

  return (
    <div className="mb-5 flex flex-wrap">
      {paymentSteps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${coloredSteps(
            index,
            activeStep
          )}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

CheckoutWizard.displayname = "CheckoutWizard";

const coloredSteps = (index: number, activeStep: number) =>
  index <= activeStep
    ? "border-indigo-500 text-indigo-500"
    : "border-gray-400 text-gray-400";

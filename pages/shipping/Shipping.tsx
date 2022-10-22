import React from "react";
import { Layout, CheckoutWizard } from "../../components";

export default function Shipping() {
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
    </Layout>
  );
}

Shipping.displayName = "Shipping";

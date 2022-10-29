import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Layout, CheckoutWizard } from "components";
import { Store, ShippingAddressInterface } from "utils";

export default function Shipping(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: ShippingAddressInterface) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-wscreen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="w-full"
            autoFocus
            {...register("fullName", {
              required: "Please enter a full name.",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">
              {String(errors.fullName.message)}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="w-full"
            {...register("address", {
              required: "Please enter an address.",
              minLength: {
                value: 3,
                message: "The address should have more than 2 characters.",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{String(errors.address.message)}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            className="w-full"
            {...register("city", {
              required: "Please enter a city.",
            })}
          />
          {errors.city && (
            <div className="text-red-500">{String(errors.city.message)}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            className="w-full"
            {...register("postalCode", {
              required: "Please enter a postal code.",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">
              {String(errors.postalCode.message)}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            className="w-full"
            {...register("country", {
              required: "Please enter a country.",
            })}
          />
          {errors.country && (
            <div className="text-red-500">{String(errors.country.message)}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

Shipping.displayName = "Shipping";

Shipping.auth = true;

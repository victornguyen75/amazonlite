import { useEffect, useReducer } from "react";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout, useToast } from "components";
import { getError, Product } from "utils";

export default function Order() {
  const {
    query: { id: orderId },
  } = useRouter();

  const toast = useToast();

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });

  const [{ isPending }, payPalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();

      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        payPalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        payPalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };

      loadPayPalScript();
    }
  }, [order, orderId, successPay, payPalDispatch]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  if (loading) {
    return (
      <Layout title={`Order ${orderId}`}>
        <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
        <div>Loading</div>
      </Layout>
    );
  } else if (error) {
    return (
      <Layout title={`Order ${orderId}`}>
        <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
        <div className="alert-error">{error}</div>
      </Layout>
    );
  }

  const createOrder = async (
    _: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const orderId = await actions.order.create({
      purchase_units: [
        {
          amount: { value: totalPrice },
        },
      ],
    });
    return orderId;
  };

  const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
    try {
      const details = await actions.order.capture();
      dispatch({ type: "PAY_REQUEST" });

      const { data } = await axios.put(`/api/orders/${order._id}/pay`, details);

      dispatch({ type: "PAY_SUCCESS", payload: data });
      toast.pushSuccess("The order has been paid successfully.");
    } catch (error) {
      dispatch({ type: "PAY_FAIL", payload: getError(error) });
      toast.pushError(getError(error));
    }
  };

  const onError = (err: Record<string, unknown>) => {
    toast.pushError(getError(err));
  };

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress.fullName}, {shippingAddress.address},{" "}
              {shippingAddress.city}, {shippingAddress.postalCode},{" "}
              {shippingAddress.country}
            </div>
            {isDelivered ? (
              <div className="alert-success">Delivered at {deliveredAt}</div>
            ) : (
              <div className="alert-error">Not delivered</div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{paymentMethod}</div>
            {isPaid ? (
              <div className="alert-success">Paid at {paidAt}</div>
            ) : (
              <div className="alert-error">Not Paid</div>
            )}
          </div>

          <div className="card overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="    p-5 text-right">Quantity</th>
                  <th className="  p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item: Product) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className=" p-5 text-right">{item.cartCount}</td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-right">
                      ${item.cartCount * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemsPrice}</div>
                </div>
              </li>{" "}
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className="w-full">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <div>Loading...</div>}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    default:
      state;
  }
};

Order.auth = true;

Order.displayName = "Order";

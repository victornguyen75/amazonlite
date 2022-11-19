import { useEffect, useReducer } from "react";
import axios from "axios";
import Link from "next/link";
import { Layout } from "components";
import { getError } from "utils";

export default function OrderHistory(): JSX.Element {
  const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Layout title="Order History">
        <h1 className="mb-4 text-xl">Order History</h1>
        <div>Loading...</div>
      </Layout>
    );
  } else if (error) {
    return (
      <Layout title="Order History">
        <h1 className="mb-4 text-xl">Order History</h1>
        <div className="alert-error">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Order History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th className="px-5 text-left">ID</th>
              <th className="p-5 text-left">DATE</th>
              <th className="p-5 text-left">TOTAL</th>
              <th className="p-5 text-left">PAID</th>
              <th className="p-5 text-left">DELIVERED</th>
              <th className="p-5 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-5">{order._id.substring(20, 24)}</td>
                <td className="p-5">{order.createdAt.substring(10)}</td>
                <td className="p-5">{order.totalPrice}</td>
                <td className="p-5">
                  {order.isPaid ? `${order.paidAt.substring(10)}` : "Not Paid"}
                </td>
                <td className="p-5">
                  {order.isDelivered
                    ? `${order.deliveredAt.substring(10)}`
                    : "Not Delivered"}
                </td>
                <td className="p-5">
                  <Link href={`/order/${order._id}`} passHref>
                    <a>Details</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    default:
      state;
  }
};

OrderHistory.auth = true;

OrderHistory.displayName = "OrderHistory";

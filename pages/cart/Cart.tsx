import { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useToast, Layout } from "components";
import { Store, Product } from "utils";

const Cart = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { items },
  } = state;

  const removeItem = (item: Product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    toast.pushSuccess("Successfully removed the item");
  };

  const updateCart = async (item: Product, quantity: number) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.stockCount < quantity) {
      return toast.pushWarning("Sorry! This product is now out of stock.");
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, cartCount: quantity },
    });
    toast.pushSuccess("Successfully updated the item");
  };

  const handleCheckout = () => {
    toast.pushInfo("Redirecting to the checkout page...");
    router.push("login?redirect=/shipping");
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/">
            <button className="primary-button" type="button">
              Go Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: Product) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            height="50"
                            width="50"
                          />
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.cartCount}
                        onChange={(e) =>
                          updateCart(item, Number(e.target.value))
                        }
                      >
                        {Array.from(Array(item.stockCount).keys()).map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItem(item)}>
                        <XCircleIcon className="h-5 w-5">
                          {item.cartCount}
                        </XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal (
                  {items.reduce(
                    (total: number, item: Product) => total + item.cartCount,
                    0
                  )}
                  ) : $
                  {items.reduce(
                    (total: number, item: Product) =>
                      total + item.cartCount * item.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={handleCheckout}
                  className="primary-button w-full"
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

Cart.displayName = "Cart";

export default dynamic(() => Promise.resolve(Cart), { ssr: false });

import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { XCircleIcon } from "@heroicons/react/outline";

import { Layout } from "../../components";
import { Store, Product } from "../../utils";

export default function Cart(): JSX.Element {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { items },
  } = state;

  const removeItem = (item: Product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCart = (item: Product, quantity: number) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, cartCount: quantity },
    });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/">
            <button
              className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white text-center py-2 px-4 rounded"
              type="button"
            >
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
                  onClick={() => router.push("/shipping")}
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
}

Cart.displayName = "Cart";

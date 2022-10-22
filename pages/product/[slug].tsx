import { useContext, Dispatch } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useToast, Layout } from "../../components";
import { data, Store, Product, State, ActionInterface } from "../../utils";

export default function ProductScreen(): JSX.Element {
  const toast = useToast();
  const { state, dispatch } = useContext<{
    state: State;
    dispatch: Dispatch<ActionInterface>;
  }>(Store);
  const { query } = useRouter();
  const { slug } = query;

  const product = data.products.find((x) => x.slug === slug);

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCart = () => {
    const existingItem: Product = state.cart.items.find(
      (x: Product) => x.slug === product.slug
    );
    const cartCount: number = existingItem ? existingItem.cartCount + 1 : 1;

    if (product.stockCount < cartCount) {
      toast.pushWarning("Sorry! This product is now out of stock.");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        cartCount,
      },
    });

    toast.pushSuccess("Item added");
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/"> &#12296; Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            height="640"
            width="640"
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of 5 ({product.numReviews} reviews)
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex-justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex-justify-between">
              <div>Status</div>
              <div>{product.stockCount > 0 ? "in Stock" : "Unavailable"}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

ProductScreen.displayName = "ProductScreen";

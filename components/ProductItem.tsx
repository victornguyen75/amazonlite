import { useContext, Dispatch } from "react";
import Link from "next/link";
import Image from "next/image";

import { Store, Product, CartInterface, ActionInterface } from "../utils";
import { useToast } from "../components";

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps): JSX.Element => {
  const toast = useToast();
  const { state, dispatch } = useContext<{
    state: CartInterface;
    dispatch: Dispatch<ActionInterface>;
  }>(Store);

  const addToCart = () => {
    const existingItem: Product = state.cart.items.find(
      (x: Product) => x.slug === product.slug
    );
    const cartCount: number = existingItem ? existingItem.cartCount + 1 : 1;

    if (product.stockCount < cartCount) {
      toast?.pushWarning("Sorry! This product is now out of stock.");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...product,
        cartCount,
      },
    });
    toast?.pushSuccess("Item added");
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            src={product.image}
            alt={product.name}
            height="362"
            width="362"
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button" onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

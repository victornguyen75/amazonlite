import Image from "next/image";
import Link from "next/link";
import { Product } from "utils";

interface ProductItemProps {
  addToCart: (product: Product) => void;
  product: Product;
}

export const ProductItem = ({
  product,
  addToCart,
}: ProductItemProps): JSX.Element => {
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
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

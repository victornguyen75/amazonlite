// @ts-nocheck for ProductModel.find() at line 62
import { useContext, Dispatch } from "react";
import axios from "axios";
import { Layout, ProductItem, useToast } from "components";
import ProductModel from "models/Product";
import { Action, db, Product, State, Store } from "utils";

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps): JSX.Element => {
  const { state, dispatch } = useContext<{
    state: State;
    dispatch: Dispatch<Action>;
  }>(Store);
  const toast = useToast();

  const addToCart = async (product: Product) => {
    const existingItem: Product = state.cart.items.find(
      (x: Product) => x.slug === product.slug
    );
    const cartCount: number = existingItem ? existingItem.cartCount + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.stockCount < cartCount) {
      return toast.pushWarning("Sorry! This product is now out of stock.");
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
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            addToCart={addToCart}
            product={product}
            key={product.slug}
          />
        ))}
      </div>
    </Layout>
  );
};

Home.displayName = "Home";

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await ProductModel.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

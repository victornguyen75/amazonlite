import { Layout, ProductItem } from "components";
import ProductModel from "models/Product";
import { db, Product } from "utils";

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps): JSX.Element => (
  <Layout title="Home Page">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  </Layout>
);

Home.displayName = "Home";

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await ProductModel.find().lean();
  return {
    props: {
      products: products.map(db.coverDocToObj),
    },
  };
}

import { Layout, ProductItem } from "components";
import { data } from "utils";

const Home = (): JSX.Element => (
  <Layout title="Home Page">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {data.products.map((product) => (
        <ProductItem product={product} key={product.slug} />
      ))}
    </div>
  </Layout>
);

Home.displayName = "Home";

export default Home;

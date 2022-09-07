import { FunctionComponent } from "react";
import { Layout } from "../components";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return <Layout title="amazonlite">Home page</Layout>;
};

Home.displayName = "Home";

export default Home;

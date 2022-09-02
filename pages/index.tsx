import React from "react";
import { Layout } from "../components";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return <Layout title="amazonlite">Home page</Layout>;
};

Home.displayName = "Home";

export default Home;

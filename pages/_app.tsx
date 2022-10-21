import React from "react";
import { AppProps } from "next/app";
import { GlobalProviders } from "../components";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { session, ...props } = pageProps;
  return (
    <GlobalProviders session={session}>
      <Component {...props} />
    </GlobalProviders>
  );
};

App.displayName = "App";

export default App;

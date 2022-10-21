import React from "react";
import { GlobalProviders } from "../components";
import "../styles/globals.css";

const App = ({ Component, pageProps }): JSX.Element => {
  const { session, ...props } = pageProps;
  return (
    <GlobalProviders session={session}>
      <Component {...props} />
    </GlobalProviders>
  );
};

App.displayName = "App";

export default App;

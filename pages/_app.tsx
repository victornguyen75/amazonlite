import React from "react";
import { StoreProvider } from "../utils";
import "../styles/globals.css";

const App = ({ Component, pageProps }): JSX.Element => {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};

App.displayName = "App";

export default App;

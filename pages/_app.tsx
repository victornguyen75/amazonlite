import React from "react";
import { StoreProvider } from "../utils";
import { ToastProvider } from "../components/Toast";
import "../styles/globals.css";

const App = ({ Component, pageProps }): JSX.Element => {
  return (
    <StoreProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </StoreProvider>
  );
};

App.displayName = "App";

export default App;

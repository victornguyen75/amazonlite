import React from "react";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "../utils";
import { ToastProvider } from "../components/Toast";
import "../styles/globals.css";

const App = ({ Component, pageProps }): JSX.Element => {
  const { session, ...props } = pageProps;
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <ToastProvider>
          <Component {...props} />
        </ToastProvider>
      </StoreProvider>
    </SessionProvider>
  );
};

App.displayName = "App";

export default App;

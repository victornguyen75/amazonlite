import React from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "../components";
import { StoreProvider } from "../utils";

export const GlobalProviders = ({ session, children }): JSX.Element => (
  <SessionProvider session={session}>
    <StoreProvider>
      <ToastProvider>{children}</ToastProvider>
    </StoreProvider>
  </SessionProvider>
);

GlobalProviders.displayName = "GlobalProviders";

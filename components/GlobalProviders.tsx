import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "../components";
import { StoreProvider } from "../utils";

interface ProviderProps {
  session: Session;
  children: ReactNode;
}

declare type ISODateString = string;

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Session {
  user?: User;
  expires: ISODateString;
}

export const GlobalProviders = ({
  session,
  children,
}: ProviderProps): JSX.Element => (
  <SessionProvider session={session}>
    <StoreProvider>
      <ToastProvider>{children}</ToastProvider>
    </StoreProvider>
  </SessionProvider>
);

GlobalProviders.displayName = "GlobalProviders";

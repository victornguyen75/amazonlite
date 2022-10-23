import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GlobalProviders } from "../components";
import "../styles/globals.css";

// Can't figure out how to extend AppProps to include Component.auth,
// so I'll replace AppProps with any for now
const App = ({ Component, pageProps }: any): JSX.Element => {
  const { session, ...props } = pageProps;
  return (
    <GlobalProviders session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...props} />
        </Auth>
      ) : (
        <Component {...props} />
      )}
    </GlobalProviders>
  );
};

App.displayName = "App";

export default App;

const Auth = ({ children }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};

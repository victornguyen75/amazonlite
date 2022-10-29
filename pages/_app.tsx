import { Auth, GlobalProviders } from "components";
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

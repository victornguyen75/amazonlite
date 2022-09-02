import React from "react";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.displayName = "App";

export default App;

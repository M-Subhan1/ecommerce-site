import type { AppProps } from "next/app";
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import theme from "../src/theme";
import { useStore } from "../src/store";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/index";
import Script from "next/script";
import SnackBar from "../components/SnackBar";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: Element = document.querySelector("#jss-server-side")!;
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  });

  return (
    <React.Fragment>
      <Head>
        <title>Dummy Stores</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navbar cartURL='/cart' />
          <CssBaseline />
          <Component {...pageProps} />
          <Footer />
          <SnackBar />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;

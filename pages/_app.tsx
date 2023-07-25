import { StyledThemeProvider } from "@definitions/styled-components";
import store from "@redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "../src/components/layout";
import "../src/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <StyledThemeProvider>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </StyledThemeProvider>
  );
}

export default MyApp;

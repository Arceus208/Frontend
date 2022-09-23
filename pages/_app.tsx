import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "../context/shopContext";

import { AuthProvider } from "../context/authContext";
import Layout from "../components/custom_components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

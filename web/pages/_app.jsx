import Layout from "../components/Layout";
import "../styles/globals.css";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../services";

function MyApp({Component, pageProps}) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;

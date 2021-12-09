const {ApolloClient, InMemoryCache, HttpLink} = require("@apollo/client");
const fetch = require("cross-fetch");

const apolloClient = new ApolloClient({
  link: new HttpLink({uri: "/graphql", fetch}),
  cache: new InMemoryCache(),
})

module.exports = apolloClient;
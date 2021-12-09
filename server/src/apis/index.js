const accounts = require("./accounts"),
  deliveries = require("./deliveries"),
  hatts = require("./hatts"),
  orders = require("./orders"),
  products = require("./products"),
  {GraphQLSchema, GraphQLObjectType} = require("graphql");

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Root query for all different get requests.",
    fields: () => ({
      ...accounts.query,
      //...hatts.query,
      //...orders.query,
      //...products.query,
      //...deliveries.query,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    description:
      "Root mutation for all different post, put and delete requests.",
    fields: () => ({
      ...accounts.mutation,
      //...hatts.mutation,
      //...orders.mutation,
      //...products.mutation,
      //...deliveries.mutation,
    }),
  }),
});

module.exports = schema;

const {Orders} = require("./views"),
  {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
  } = require("graphql");

/*
// orders list & create new order
router
  .route("/")
  .get(async (req, res, next) => {
    // list of orders by filter
    //
  })
  .post(async (req, res, next) => {
    // create a new order
    //
  });

// single order details
router
  .route("/:id")
  .get(async (req, res, next) => {
    // single order details by id
    //
  })
  .put(async (req, res, next) => {
    // change in an order by id
    //
  })
  .delete(async (req, res, next) => {
    // cancels an order by id
    //
  });

export default router;
*/

const Queries = {
  getOrder: {},
  listOrders: {},
};

const Mutations = {
  newOrder: {},
  changeOrder: {},
  cancelOrder: {},
};

const orders = {
  query: {
    ...Queries,
  },
  mutation: {
    ...Mutations,
  },
};

module.exports = orders;

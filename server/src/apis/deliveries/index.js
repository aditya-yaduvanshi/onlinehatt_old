const {Deliveries} = require("./views"),
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
  getDelivery: {},
  listDeliveries: {},
};

const Mutations = {
  newDelivery: {},
  updateDelivery: {},
  cancelDelivery: {},
};

const deliveries = {
  query: {
    ...Queries,
  },
  mutation: {
    ...Mutations,
  },
};

module.exports = deliveries;

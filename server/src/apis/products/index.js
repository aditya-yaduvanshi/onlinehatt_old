const {Products} = require("./views"),
  {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
  } = require("graphql");

/*
// products lists and add new product
router
  .route("/")
  .get(async (req, res, next) => {
    // lists products by filter
    //
  })
  .post(async (req, res, next) => {
    // add new product to a hatt
    let product = await Products.create()
    if(!product)
      return res.sendStatus(502)
    
    return res.status(201).json({
      product: product
    })
  });

// single product
router
  .route("/:id")
  .get(async (req, res, next) => {
    // single product details by id
    //
  })
  .put(async (req, res, next) => {
    // changes in a product by id
    //
  })
  .delete(async (req, res, next) => {
    // delete a product by id
    //
  });

// products recommendation based on user preference
router.route("/:userId/pref")
  .get(async (req, res, next) => {
    // products lists based on user preference
    //
  })
  .post(async (req, res, next) => {
    // create user preference
    //
  })
  .put(async (req, res, next) => {
    // change in user preference
    //
  })
  .delete(async (req, res, next) => {
    // delete user preference
    //
  })

export default router;
*/

const Queries = {
  getProduct: {},
  listProducts: {},
};

const Mutations = {
  addProduct: {},
  changeProduct: {},
  removeProduct: {},
};

const products = {
  query: {
    ...Queries,
  },
  mutation: {
    ...Mutations,
  },
};

module.exports = products;

const {Hatts, Employees} = require("./views"),
  {GraphQLUpload} = require("graphql-upload"),
  {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList} = require("graphql");

/* 
// hatts single details
router
  .route("/:hattUrl")
  .get(async (req, res, next) => {
    // hatts detail by url
    let hatt = await Hatts.single(req.params.hattUrl);
    if(!hatt) return res.sendStatus(404);
    return res.status(200).json({hatt});
  })
  .put(async (req, res, next) => {
    // hatts updating by hatt url
    let ok = await Hatts.update({...req.body, hattUrl : req.params.hattUrl});
    if(!ok) return res.sendStatus(500);
    else return res.sendStatus(205);
  })
  .delete(async (req, res, next) => {
    // hatts deleting by hatt id
    res.json({res: "deleting"});
  });

// hatts create & lists for location wise purpose
router
  .route("/")
  .get(async (req, res, next) => {
    // lists hatts based on query filter
    let hatts = await Hatts.lists();
    if(!hatts) return res.sendStatus(500);
    return res.status(200).json({hatts})
  })
  .post(async (req, res, next) => {
    // creates new hatts
    let ok = await Hatts.create(req.body);
    if(ok) return res.sendStatus(201);
    else return res.sendStatus(500);
  });

// adding members to hatts
router
  .route("/:hattId/users")
  .get(async (req, res, next) => {
    // lists users of a hatt
    //
  })
  .post(async (req, res, next) => {
    // add new users to a hatt
    //
  })
  .put(async (req, res, next) => {
    // change user roles or data for a hatt
    //
  })
  .delete(async (req, res, next) => {
    // remove user from a hatt
    //
  });

export default router;

*/

const Queries = {
  getHatt: {},
  listHatts: {},
  listHattEmployee: {},
  getHattEmployee: {},
};

const Mutations = {
  createHatt: {
    type: new GraphQLObjectType({
      name: "CreateHatt",
      description: "Create a new hatt.",
      fields: () => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        slug: {type: new GraphQLNonNull(GraphQLString)},
        mainPic: {type: GraphQLUpload},
        pictures: {type: new GraphQLList(GraphQLUpload)},
        ownerId: {type: new GraphQLNonNull(GraphQLString)},
        hattType: {type: new GraphQLNonNull(GraphQLString)},
        openTime: {type: GraphQLString},
        closeTime: {type: GraphQLString},
        started: {type: GraphQLString},
        locality: {type: new GraphQLNonNull(GraphQLString)},
        area: {type: new GraphQLNonNull(GraphQLString)},
        city: {type: new GraphQLNonNull(GraphQLString)},
        state: {type: new GraphQLNonNull(GraphQLString)},
        country: {type: new GraphQLNonNull(GraphQLString)},
      }),
      resolve: async () => ({})
    }),
  },
  updateHatt: {},
  deleteHatt: {},
  addHattEmployee: {},
  updateHattEmployee: {},
  removeHattEmployee: {},
};

const hatts = {
  query: {
    ...Queries,
  },
  mutation: {
    ...Mutations,
  },
};

module.exports = hatts;

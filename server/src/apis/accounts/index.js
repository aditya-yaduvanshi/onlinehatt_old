const {Accounts, Otps} = require("./views"),
  {Query, Mutation} = require("./resolvers"),
  {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
  } = require("graphql");

const UserType = new GraphQLObjectType({
  name: "UserAccount",
  description: "User account fields.",
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    avatar: {type: GraphQLString},
    identifier: {type: GraphQLString},
    username: {type: GraphQLString},
    merchant: {type: GraphQLBoolean},
  }),
});

const accounts = {
  query: {
    signin: {
      type: new GraphQLObjectType({
        name: "Signin",
        description: "Account signin and token generation.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
          access: {type: GraphQLString},
          refresh: {type: GraphQLString},
          user: {type: UserType},
        }),
      }),
      args: {
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
      },
      resolve: Query.signin,
    },
    getProfile: {
      type: new GraphQLObjectType({
        name: "GetProfile",
        description: "Single user profile information.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {},
      resolve: async (parent, args) => await Accounts.signin(args),
    },
    getOtp: {
      type: new GraphQLObjectType({
        name: "GenerateOtp",
        description: "Otp generation for verification.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        for: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Otps.send(args),
    },
    refresh: {
      type: new GraphQLObjectType({
        name: "RefreshToken",
        description: "Get new access and refresh token.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
          access: {type: GraphQLString},
          refresh: {type: GraphQLString},
        }),
      }),
      args: {
        token: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Accounts.getRefresh(args.token),
    },
  },
  mutation: {
    register: {
      type: new GraphQLObjectType({
        name: "Register",
        description: "Register a new account.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: new GraphQLNonNull(GraphQLString)},
        password2: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: Mutation.register,
    },
    resetPassword: {
      type: new GraphQLObjectType({
        name: "ResetAccount",
        description: "Change account username or reset password.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Accounts.reset(args),
    },
    verifyOtp: {
      type: new GraphQLObjectType({
        name: "VerifyOtp",
        description: "Verify generated otp & signin via otp.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
          access: {type: GraphQLString},
          refresh: {type: GraphQLString},
          merchant: {type: GraphQLBoolean},
        }),
      }),
      args: {
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        otp: {type: new GraphQLNonNull(GraphQLString)},
        for: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Otps.verify(args),
    },
    createProfile: {
      type: new GraphQLObjectType({
        name: "CreateProfile",
        description: "Create a new user profile.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Accounts.register(args),
    },
    updateProfile: {
      type: new GraphQLObjectType({
        name: "UpdateProfile",
        description: "Update an existing user profile.",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Accounts.register(args),
    },
    deleteProfile: {
      type: new GraphQLObjectType({
        name: "DeleteProfile",
        description: "Delete an existing user profile .",
        fields: () => ({
          status: {type: GraphQLInt},
          msg: {type: GraphQLString},
        }),
      }),
      args: {
        phone: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: async (parent, args) => await Accounts.register(args),
    },
  },
};

module.exports = accounts;

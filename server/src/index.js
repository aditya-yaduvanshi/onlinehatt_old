require("dotenv").config();
const express = require("express"),
  app = express(),
  axios = require("axios").default,
  cors = require("cors"),
  {mongoConnect} = require("./dbconfig"),
  path = require("path"),
  {graphqlHTTP} = require("express-graphql"),
  {graphqlUploadExpress} = require("graphql-upload"),
  schema = require("./apis");

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// client static serve
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "web/out")));
}

app.use(
  "/graphql",
  graphqlUploadExpress({maxFileSize: 5000000, maxFiles: 15}),
  graphqlHTTP({schema, graphiql: true})
);

// database connection
mongoConnect(app);

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// allow cross-origin request
app.use(cors());

// connect to mlab database
mongoose
  .set("useUnifiedTopology", "true")
  .set("useNewUrlParser", "true")
  .connect(process.env.MONGO_DB_URI);
mongoose.connection.once("open", () => {
  console.log("connected to mongodb database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});

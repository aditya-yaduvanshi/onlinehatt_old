require("dotenv").config();
const mongoose = require("mongoose"),
  {createClient} = require("redis"),
  {PORT, HOST, mongoUri, redisUri} = process.env,
  redisClient = createClient({url: redisUri});

process.on("unhandledRejection", (err) => console.log(err));

async function mongoConnect(app) {
  await redisClient.connect();
  mongoose
    .connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database Connected.");
      app.listen(PORT || 5000, HOST, () => console.log("Server Listening On:", PORT || 5000)
      );
    })
    .catch((err) => {
      console.log("DB ERROR : ", err);
      console.log("Exiting...Done.");
      redisClient.quit();
      process.exit();
    });
}

module.exports = {
  mongoConnect,
  redisClient,
};

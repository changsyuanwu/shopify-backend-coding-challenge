const { MongoClient } = require("mongodb");
const connectionString =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db;

module.exports = {
  connectToServer: function (callback) {
    client.connect((err, dbClient) => {
      // Verify we got a good "dbClient" object
      if (dbClient) {
        db = dbClient.db("shopify-app");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return db;
  },
};

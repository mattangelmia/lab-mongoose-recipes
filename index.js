const mongoose = require("mongoose");
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Recipe.create({
    //   title: "Chicken Soup",
    //   level: "Easy Peasy",
    //   ingredients: ["water", "chicken", "potato", "carrots", "noodles", "salt"],
    //   cuisine: "Latin",
    //   dishType: "soup",
    //   duration: 15,
    //   creator: "Fabian Pena",
    // }).then(function (recipe) {
    //   console.log(recipe);
    // });
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data);
    Recipe.updateOne(
      { title: "Rigatoni  Genovese" },
      { $set: { duration: 100 } }
    )
      .then((result) => {
        console.log("update succesful!", result);
      })
      .catch((err) => console.error(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

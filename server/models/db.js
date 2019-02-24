/**
 * This is where we set up the database, in this case NeDB (with the promise wrapper)
 */
const Datastore = require("nedb-promise");

const recipeDb = new Datastore({
  filename: "/tmp/recipes.json",
  autoload: true
});

const ingredientDb = new Datastore({
  filename: "/tmp/ingredients.json",
  autoload: true
});

module.exports = { recipeDb, ingredientDb };

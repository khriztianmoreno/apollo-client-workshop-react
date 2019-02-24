/**
 * npm run seed
 * to seed the database with some initial data
 */
const { recipeDb } = require("./db");

Promise.all([
  recipeDb.insert([
    {
      _id: "10",
      title: "Wiener schnitzel",
      vegetarian: false,
      ingredients: [
        {
          _id: "1",
          name: "Avocate",
        },
        {
          _id: "2",
          name: "Tomato",
        }
      ],
      preparation: []
    },
    {
      _id: "11",
      title: "Guacamole",
      vegetarian: true,
      ingredients: [
        {
          _id: "2",
          name: "Tomato",
        }
      ],
      preparation: []
    },
    {
      _id: "12",
      title: "Caesar salad",
      vegetarian: false,
      ingredients: [],
      preparation: []
    },
    {
      _id: "13",
      title: "Apple strudel",
      vegetarian: true,
      ingredients: [],
      preparation: []
    }
  ])
])
  .then(() => {
    console.log("✅ Database seeding successful.");
  })
  .catch(err => {
    console.log("⚠️ Database seeding error ⚠️");
    console.log(err);
  });

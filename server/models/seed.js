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
      calories: 240,
      fat: '18%',
      cholestero: '0%',
      sodium: '16%',
      carbohydrate: '9%',
      protein: '31%',
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
      calories: 270,
      fat: '19%',
      cholestero: '1%',
      sodium: '15%',
      carbohydrate: '10%',
      protein: '30%',
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
      calories: 240,
      fat: '18%',
      cholestero: '0%',
      sodium: '17%',
      carbohydrate: '10%',
      protein: '25%',
      ingredients: [],
      preparation: []
    },
    {
      _id: "13",
      title: "Apple strudel",
      calories: 240,
      fat: '18%',
      cholestero: '0%',
      sodium: '16%',
      carbohydrate: '9%',
      protein: '31%',
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

import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Recipes from "./components/Recipes"
import AddRecipe from "./components/AddRecipe"
import logo from './logo.svg';
import './App.css';

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes = JSON.parse(localStorage.getItem("starredRecipes")) || [];
      
      return starredRecipes.includes(parent.id);
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes = JSON.parse(localStorage.getItem("starredRecipes")) || [];
  
      if (variables.isStarred) {
        const addItem = JSON.stringify(starredRecipes.concat([variables.id]))
        localStorage.setItem("starredRecipes", addItem);
      } else {
        const removeItem = JSON.stringify(starredRecipes.filter(recipeId => recipeId !== variables.id))
        localStorage.setItem("starredRecipes", removeItem);
      }
      
      return {
        __typename: "Recipe",
        isStarred: variables.isStarred
      };
    }
  }
}

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {
    resolvers,
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <AddRecipe />
          <Recipes />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

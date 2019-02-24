import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Recipes from "./components/Recipes"
import AddRecipe from "./components/AddRecipe"
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
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

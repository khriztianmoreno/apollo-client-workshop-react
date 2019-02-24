import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider , ApolloConsumer} from "react-apollo";

import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <div>Hello World!</div>
          <ApolloConsumer>
            {
              client => {
                client.query({
                  query: gql`
                    {
                      recipes {
                        id
                        title
                      }
                    }
                  `
                })
                .then(result => console.log(result));
                
                return null;
              }
            }
          </ApolloConsumer>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

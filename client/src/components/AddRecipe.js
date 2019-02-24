import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_RECIPES } from "./Recipes";

const ADD_RECIPE_MUTATION = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;

export default class AddRecipe extends React.Component {
  state = {
    title: "",
    vegetarian: false
  };

  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  updateTitle = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  resetFields = () => {
    this.setState({ title: "", vegetarian: false });
  };

  handleSubmit = (evt, addRecipe) => {
    const { title, vegetarian } = this.state;

    evt.preventDefault();
    addRecipe({
      variables: { recipe: { title: title, vegetarian: vegetarian } }
    });

    this.resetFields();
  };

  render() {
    return (
      <Mutation
        mutation={ADD_RECIPE_MUTATION}
        refetchQueries={[
          { query: GET_RECIPES, variables: { vegetarian: false } },
          { query: GET_RECIPES, variables: { vegetarian: true } }
        ]}
        awaitRefetchQueries={true}
      >
        {(addRecipe, { loading, error }) => (
          <form onSubmit={evt => this.handleSubmit(evt, addRecipe) } >
            <label>
              <span>Title</span>
              <input
                type="text"
                value={this.state.title}
                onChange={this.updateTitle}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={this.state.vegetarian}
                onChange={this.updateVegetarian}
              />
              <span>Vegetarian</span>
            </label>
            <div>
              <button>Add Recipe</button>
            </div>
            {loading && <p>Adding a recipe - please wait...</p>}
            {error && <p>Error :( Please try again</p>}
          </form>
        )}
      </Mutation>
    );
  }
}

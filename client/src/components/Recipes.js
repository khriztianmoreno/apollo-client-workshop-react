import React, { useState } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

export const GET_RECIPES = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
      isStarred @client
    }
  }
`;

const UPDATE_RECIPE_STARRED_MUTATION = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

const Start = ({ id, isStarred }) => (
  <Mutation
    mutation={UPDATE_RECIPE_STARRED_MUTATION}
    refetchQueries={[
      { query: GET_RECIPES, variables: { vegetarian: false } },
      { query: GET_RECIPES, variables: { vegetarian: true } }
    ]}
    awaitRefetchQueries={true}
  >
    {
      (updateRecipeStarred, { loading, error }) => (
        <button
          className="star-btn"
          style={{ 
            color: isStarred ? "orange" : "grey",
            animation: loading ? "inflate 0.7s ease infinite alternate" : "none",
          }}
          onClick={() =>
            updateRecipeStarred({
              variables: { id, isStarred: !isStarred }
            })
          }
        >
          ★
        </button>
      )
    }
  </Mutation>
)

const Recipes = () => {
  const [checked, setVegetarian] = useState({ vegetarian: false })

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    
    setVegetarian(oldStates => ({
      ...oldStates,
      [name]: value
    }));
  };

  return (
    <React.Fragment>
      <label>
        <input
          type="checkbox"
          name="vegetarian"
          checked={checked.vegetarian}
          onChange={handleInputChange}
        />
        <span>vegetarian</span>
      </label>
      <Query query={GET_RECIPES} variables={{ vegetarian: checked.vegetarian }}>
        {
          ({ data, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Something went wrong</p>;

            return (
              <ul>
                {
                  data.recipes.map(({ id, title, isStarred }) => (
                    <li key={id}>
                      {title}
                      <Start {...{id, isStarred}} />
                    </li>
                  ))
                }
              </ul>
            );
          }
        }
      </Query>
    </React.Fragment>
  )
}

export default Recipes;

import React, { useState } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const GET_RECIPES = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

const Recipes = () => {
  const [checked, setVegetarian] = useState({ vegetarian: true })

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
                {data.recipes.map(({ id, title }) => (
                  <li key={id}>{title}</li>
                ))}
              </ul>
            );
          }
        }
      </Query>
    </React.Fragment>
  )
}

export default Recipes;

import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [apiResponse, setApiResponse] = useState({
    meals: [],
    drinks: [],
  });
  const [filteredRecipes, setFilteredRecipes] = useState({
    meals: [],
    drinks: [],
  });

  const value = useMemo(
    () => ({
      apiResponse,
      setApiResponse,
      filteredRecipes,
      setFilteredRecipes,

    }),
    [
      apiResponse,
      filteredRecipes,
    ],
  );

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;

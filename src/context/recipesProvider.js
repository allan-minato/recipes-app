import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import RecipesContext from './recipesContext';

function RecipesProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const value = useMemo(
    () => ({
      counter,
      setCounter,
    }),
    [
      counter,
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

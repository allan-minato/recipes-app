import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import RecipesProvider from '../../context/recipesProvider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      <RecipesProvider>
        { component }
      </RecipesProvider>
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

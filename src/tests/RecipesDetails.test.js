import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithRouter } from './helpers/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';
import { RECIPE_TITLE, START_RECIPE_BTN } from '../services/constTypes';

import App from '../App';

const DRINKS_ROUTE = '/drinks/11007';

describe('Testes da Tela Recipe Details', () => {
  it('Testa se é exibido "Carregando" enquanto a requisição para a API é realizada', () => {
    renderWithRouter(<RecipeDetails />);

    const isLoading = screen.getByText(/Carregando.../i);
    expect(isLoading).toBeInTheDocument();
  });

  it('Testa se o botão "Start Recipe" é exibido', async () => {
    const drinksRoute = '/drinks/11007';
    render(
      <MemoryRouter initialEntries={ [drinksRoute] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => screen.findByTestId(START_RECIPE_BTN), {
      timeout: 3000,
    });
    const button = screen.getByTestId(START_RECIPE_BTN);
    expect(button).toBeInTheDocument();
  });

  it('Testa se o botão "Start Recipe" é ocultado quando a receita já foi finalizada', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '11007' }]));

    render(
      <MemoryRouter initialEntries={ [DRINKS_ROUTE] }>
        <App />
      </MemoryRouter>,
    );

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const button = screen.queryByTestId(START_RECIPE_BTN);
    expect(button).toBeNull();
  });
});

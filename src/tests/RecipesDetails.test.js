import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';

import {
  DONE_RECIPES,
  ERROR_MESSAGE,
  FAVORITE_BTN,
  FAVORITE_RECIPES,
  IN_PROGRESS_RECIPES,
  RECIPE_TITLE,
  SHARE_BTN,
  START_RECIPE_BTN,
} from '../services/constTypes';

const DRINKS_ROUTE = '/drinks/11007';
const MEALS_ROUTE = '/meals/52772';
const ERROR_ROUTE = '/meals/527726';

describe('Testes da Tela Recipe Details', () => {
  it('Testa se é exibido "Carregando" enquanto a requisição para a API é realizada', () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    const isLoading = screen.getByText(/Carregando.../i);
    expect(isLoading).toBeInTheDocument();
  });

  it('Testa se o botão "Start Recipe" é exibido', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    await waitFor(() => screen.findByTestId(START_RECIPE_BTN), {
      timeout: 3000,
    });

    const button = screen.getByTestId(START_RECIPE_BTN);
    expect(button).toBeInTheDocument();
  });

  it('Testa se o botão "Start Recipe" é ocultado quando a receita já foi finalizada', async () => {
    localStorage.setItem(DONE_RECIPES, JSON.stringify([{ id: '11007' }]));
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const button = screen.queryByTestId(START_RECIPE_BTN);
    expect(button).toBeNull();

    localStorage.clear();
  });

  it('Testa se o botão "Continue Recipe" é exibido quando uma receita está em Progresso', async () => {
    localStorage.setItem(
      IN_PROGRESS_RECIPES,
      JSON.stringify({
        drinks: {
          11007: [],
        },
      }),
    );
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const button = screen.queryByTestId(START_RECIPE_BTN);
    expect(button.innerHTML).toBe('Continue Recipe');

    localStorage.clear();
  });

  it('Testa se é possível copiar a URL da receita ao clicar no botão', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const button = screen.getByTestId(SHARE_BTN);
    userEvent.click(button);

    const message = screen.getByText(/Link Copied!/i);
    expect(message).toBeInTheDocument();
  });

  it('Testa se é possível favoritar e desfavoritar uma receita', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toBeNull();

    const buttonMeals = screen.getByTestId(FAVORITE_BTN);
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonMeals.innerHTML).toBe(
      '<img src="whiteHeartIcon.svg" alt="Button Icon">',
    );
    userEvent.click(buttonMeals);
    expect(buttonMeals.innerHTML).toBe(
      '<img src="blackHeartIcon.svg" alt="Button Icon">',
    );

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).not.toBeNull();

    localStorage.clear();

    act(() => {
      history.push(DRINKS_ROUTE);
    });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).toBeNull();

    const buttonDrinks = screen.getByTestId(FAVORITE_BTN);
    expect(buttonDrinks).toBeInTheDocument();
    expect(buttonDrinks.innerHTML).toBe(
      '<img src="whiteHeartIcon.svg" alt="Button Icon">',
    );
    userEvent.click(buttonDrinks);
    expect(buttonDrinks.innerHTML).toBe(
      '<img src="blackHeartIcon.svg" alt="Button Icon">',
    );

    expect(JSON.parse(localStorage.getItem(FAVORITE_RECIPES))).not.toBeNull();

    localStorage.clear();
  });

  it('Testa se a rota "/meals/52722" é renderizada corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: [MEALS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const recipeName = screen.getByTestId(RECIPE_TITLE);
    expect(recipeName.innerHTML).toBe('Teriyaki Chicken Casserole');
  });

  it('Testa se a rota "/drinks/11007" é renderizada corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: [DRINKS_ROUTE] });

    await waitFor(() => screen.findByTestId(RECIPE_TITLE));

    const recipeName = screen.getByTestId(RECIPE_TITLE);
    expect(recipeName.innerHTML).toBe('Margarita');
  });

  it('Verifica se uma mensagem de erro é exibida quando a requisição não é bem sucedida', async () => {
    renderWithRouter(<App />, { initialEntries: [ERROR_ROUTE] });

    await waitFor(() => screen.findByTestId(ERROR_MESSAGE), { timeout: 2000 });

    const errorMessage = screen.getByTestId(ERROR_MESSAGE);
    expect(errorMessage).toBeInTheDocument();
  });
});

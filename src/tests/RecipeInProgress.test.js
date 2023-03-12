import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import {
  ERROR_MESSAGE,
  FAVORITE_BTN,
  FINISH_RECIPE_BTN,
  IN_PROGRESS_RECIPES,
  RECIPE_TITLE,
  SHARE_BTN,
} from '../services/constTypes';
import oneMeal from '../../cypress/mocks/oneMeal';

const ROUTE_DRINK_IN_PROGRESS = '/drinks/178319/in-progress';
const ROUTE_MEAL_IN_PROGRESS = '/meals/52771/in-progress';

describe('Testes da tela de receita em progresso', () => {
  it('Verifica se a tela é renderizada', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneDrink) });
    renderWithRouter(<App />, { initialEntries: [ROUTE_DRINK_IN_PROGRESS] });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Aquamarine');
    });

    const ingredientsList = screen.getByTestId('ingredients-ul');
    expect(ingredientsList.childElementCount).toBe(3);
  });

  it('Verifica se é possivel favoritar um drink', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneDrink) });
    renderWithRouter(<App />, { initialEntries: [ROUTE_DRINK_IN_PROGRESS] });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId(FAVORITE_BTN);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const storage = localStorage.getItem(IN_PROGRESS_RECIPES);
    expect(storage).toBe('{"drinks":{"178319":{}}}');
    localStorage.clear();
  });

  it('Verifica se é possivel favoritar uma comida', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneMeal) });
    renderWithRouter(<App />, { initialEntries: [ROUTE_MEAL_IN_PROGRESS] });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId(FAVORITE_BTN);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const storage = localStorage.getItem(IN_PROGRESS_RECIPES);
    expect(storage).toBe('{"meals":{"52771":{}}}');
    localStorage.clear();
  });

  it('Verifica se o botão "Finish Recipe" é habilitado corretamente na página de um Drink', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneDrink) });
    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [ROUTE_DRINK_IN_PROGRESS] });
    });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
    });

    const ingredientsList = screen.getByTestId('ingredients-ul');
    const numberOfChildren = ingredientsList.childElementCount;

    expect(numberOfChildren).toBe(3);

    const buttonFinish = screen.getByTestId(FINISH_RECIPE_BTN);
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();

    const ingredientCheckboxes = screen.getAllByTestId(/ingredient-checkbox/i);

    await act(async () => {
      ingredientCheckboxes.forEach((checkbox) => {
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      });
    });

    expect(buttonFinish).toBeEnabled();
    userEvent.click(buttonFinish);
    localStorage.clear();
  });

  it('Verifica se o botão "Finish Recipe" é habilitado corretamente na página de uma Comida', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneMeal) });

    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [ROUTE_MEAL_IN_PROGRESS] });
    });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
    });

    const buttonFinish = screen.getByTestId(FINISH_RECIPE_BTN);
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();

    const ingredientCheckboxes = screen.getAllByTestId(/ingredient-checkbox/i);

    await act(async () => {
      ingredientCheckboxes.forEach((checkbox) => {
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
      });
    });

    expect(buttonFinish).toBeEnabled();
    userEvent.click(buttonFinish);
    localStorage.clear();
  });

  it('Testa se é possível copiar a URL da recita clicando no botão de compartilhar', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(oneMeal) });

    await act(async () => {
      renderWithRouter(<App />, { initialEntries: [ROUTE_MEAL_IN_PROGRESS] });
    });

    await waitFor(() => {
      const title = screen.getByTestId(RECIPE_TITLE);
      expect(title).toBeInTheDocument();
    });

    const button = screen.getByTestId(SHARE_BTN);
    userEvent.click(button);

    const message = screen.getByText(/Link Copied!/i);
    expect(message).toBeInTheDocument();

    await waitFor(() => expect(message).not.toBeInTheDocument(), { timeout: 3000 });
  });

  it('Verifica se uma mensagem de erro é exibida quando a requisição não é bem sucedida', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/1783195/in-progress'] });

    await waitFor(() => screen.findByTestId(ERROR_MESSAGE), { timeout: 2000 });

    const errorMessage = screen.getByTestId(ERROR_MESSAGE);
    expect(errorMessage).toBeInTheDocument();
  });
});

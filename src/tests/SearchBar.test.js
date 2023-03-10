import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import { renderWithRouter } from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Meals from '../pages/Meals';
import Drink from '../pages/Drinks';

const searchInputId = 'search-input';
const searchBtnId = 'exec-search-btn';
const nameRadioId = 'name-search-radio';
const showSearchBarId = 'search-top-btn';

describe('Testando o componente SearchBar', () => {
  it('Verifica se o componente SearchBar é renderizado', () => {
    renderWithRouter(<SearchBar />, {
      initialEntries: ['/meals'],
    });

    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId(nameRadioId);
    expect(nameRadio).toBeInTheDocument();
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('Testa se a busca retorna a resposta esperada', () => {
    renderWithRouter(<SearchBar />, {
      initialEntries: ['/meals'],
    });
    const nameRadio = screen.getByTestId(nameRadioId);
    const searchInput = screen.getByTestId(searchInputId);

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    expect(searchInput.value).toBe('chicken');
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    const execSearchBtn = screen.getByTestId(searchBtnId);
    fireEvent.click(execSearchBtn);
  });

  it('Testa se o alert é chamado quando a busca pela primeira letra tem mais de 1 caracter', () => {
    const alertMock = jest.spyOn(window, 'alert');
    renderWithRouter(<SearchBar />, {
      initialEntries: ['/meals'],
    });
    const searchInput = screen.getByTestId(searchInputId);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId(searchBtnId);

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    expect(searchInput.value).toBe('chicken');
    fireEvent.click(firstLetterRadio);
    fireEvent.click(execSearchBtn);

    expect(alertMock).toBeCalled();
  });

  it('Verifica se o componente SearchBar é renderizado', () => {
    renderWithRouter(<SearchBar />, {
      initialEntries: ['/drinks'],
    });

    const nameRadio = screen.getByTestId(nameRadioId);
    const searchInput = screen.getByTestId(searchInputId);

    fireEvent.change(searchInput, { target: { value: 'Vodka' } });
    expect(searchInput.value).toBe('Vodka');
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    const execSearchBtn = screen.getByTestId(searchBtnId);
    fireEvent.click(execSearchBtn);
  });

  it('Testa se é redirecionado para a página de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(oneMeal) });

    const { history } = renderWithRouter(<Meals />, {
      initialEntries: ['/meals'],
    });

    const showSearchBar = screen.getByTestId(showSearchBarId);
    userEvent.click(showSearchBar);

    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    const execSearchBtn = screen.getByTestId(searchBtnId);
    expect(execSearchBtn).toBeInTheDocument();

    const nameRadio = screen.getByTestId(nameRadioId);
    expect(nameRadio).toBeInTheDocument();

    const nameOfMeal = 'Spicy Arrabiata Penne';
    userEvent.type(searchInput, nameOfMeal);
    expect(searchInput.value).toEqual(nameOfMeal);

    userEvent.click(nameRadio);
    expect(nameRadio.checked).toEqual(true);

    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfMeal}`);

    await waitFor(() => {
      const { pathname } = history.location;

      expect(pathname).toBe('/meals/52771');
    });
  });

  it('Testa se é redirecionado para a página de detalhes da receita', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(oneDrink) });

    const { history } = renderWithRouter(<Drink />, {
      initialEntries: ['/drinks'],
    });

    const showSearchBar = screen.getByTestId(showSearchBarId);
    userEvent.click(showSearchBar);

    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();

    const execSearchBtn = screen.getByTestId(searchBtnId);
    expect(execSearchBtn).toBeInTheDocument();

    const nameRadio = screen.getByTestId(nameRadioId);
    expect(nameRadio).toBeInTheDocument();

    const nameOfDrink = 'Aquamarine';
    userEvent.type(searchInput, nameOfDrink);
    expect(searchInput.value).toEqual(nameOfDrink);

    userEvent.click(nameRadio);
    expect(nameRadio.checked).toEqual(true);

    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameOfDrink}`);

    await waitFor(() => {
      const { pathname } = history.location;

      expect(pathname).toBe('/drinks/178319');
    });
  });
});

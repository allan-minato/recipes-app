import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import soupMeals from '../../cypress/mocks/soupMeals';
import ginDrinks from '../../cypress/mocks/ginDrinks';

const showSearchBarId = 'search-top-btn';
const searchInputId = 'search-input';
const searchBtnId = 'exec-search-btn';
const nameRadioId = 'name-search-radio';

describe('Testando o componente Meals', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica se o componente Meals é renderizado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(soupMeals) });

    renderWithRouter(<Meals />, {
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

    userEvent.type(searchInput, 'soup');
    expect(searchInput.value).toEqual('soup');

    userEvent.click(nameRadio);
    expect(nameRadio.checked).toEqual(true);

    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');

    const soupMeal = await screen.findByTestId('0-recipe-card');
    expect(soupMeal).toBeInTheDocument();
  });

  it('Verifica se o componente Drinks é renderizado', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(ginDrinks) });

    renderWithRouter(<Drinks />, {
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

    userEvent.type(searchInput, 'gin');
    expect(searchInput.value).toEqual('gin');

    userEvent.click(nameRadio);
    expect(nameRadio.checked).toEqual(true);

    userEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin');

    const soupMeal = await screen.findByTestId('0-recipe-card');
    expect(soupMeal).toBeInTheDocument();
  });
});

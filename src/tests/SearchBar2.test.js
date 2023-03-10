import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { renderWithRouter } from './helpers/renderWithRouter';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const searchInputId = 'search-input';
const searchBtnId = 'exec-search-btn';
const nameRadioId = 'name-search-radio';

describe('Testando o componente SearchBar2', () => {
  it('Verifica se o alert é chamado quando não tem retorno da Api de Meals', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(emptyMeals) });
    const alertMock = jest.spyOn(window, 'alert');

    renderWithRouter(<SearchBar />, {
      initialEntries: ['/meals'],
    });

    const searchInput = screen.getByTestId(searchInputId);
    const nameRadio = screen.getByTestId(nameRadioId);
    const execSearchBtn = screen.getByTestId(searchBtnId);

    fireEvent.change(searchInput, { target: { value: 'xablau' } });
    expect(searchInput.value).toBe('xablau');
    fireEvent.click(nameRadio);
    fireEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau');

    await waitFor(() => expect(alertMock).toBeCalled());
  });

  it('Verifica se o alert é chamado quando não tem retorno da Api de Drinks', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ json: jest.fn().mockResolvedValue(emptyDrinks) });
    const alertMock = jest.spyOn(window, 'alert');

    renderWithRouter(<SearchBar />, {
      initialEntries: ['/drinks'],
    });

    const searchInput = screen.getByTestId(searchInputId);
    const nameRadio = screen.getByTestId(nameRadioId);
    const execSearchBtn = screen.getByTestId(searchBtnId);

    fireEvent.change(searchInput, { target: { value: 'xablau' } });
    expect(searchInput.value).toBe('xablau');
    fireEvent.click(nameRadio);
    fireEvent.click(execSearchBtn);

    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau');

    await waitFor(() => expect(alertMock).toBeCalled());
  });
});

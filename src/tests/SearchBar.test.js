import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { renderWithRouter } from './helpers/renderWithRouter';

const searchInputId = 'search-input';

describe('Testando o componente SearchBar', () => {
  it('Verifica se o componente SearchBar é renderizado', () => {
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(searchInputId);
    expect(searchInput).toBeInTheDocument();
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    expect(firstLetterRadio).toBeInTheDocument();
  });

  it('Testa se a busca retorna a resposta esperada', () => {
    renderWithRouter(<SearchBar />);

    const nameRadio = screen.getByTestId('name-search-radio');
    const searchInput = screen.getByTestId(searchInputId);

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    expect(searchInput.value).toBe('chicken');
    fireEvent.click(nameRadio);
    expect(nameRadio.checked).toBe(true);

    const execSearchBtn = screen.getByTestId('exec-search-btn');
    fireEvent.click(execSearchBtn);
  });

  it('Testa se o alert é chamado quando a busca pela primeira letra tem mais de 1 caracter', () => {
    global.alert = jest.fn();
    renderWithRouter(<SearchBar />);
    const searchInput = screen.getByTestId(searchInputId);
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const execSearchBtn = screen.getByTestId('exec-search-btn');

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(firstLetterRadio);
    fireEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalled();
  });
});

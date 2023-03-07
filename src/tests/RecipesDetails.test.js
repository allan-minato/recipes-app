import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testes da Tela Recipe Details', () => {
  it('Testa se é exibido "Carregando" enquanto a requisição para a API é realizada', () => {
    renderWithRouter(<RecipeDetails />);

    const isLoading = screen.getByText(/Carregando.../i);
    expect(isLoading).toBeInTheDocument();
  });
});

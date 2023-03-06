import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import Footer from '../components/Footer';

describe('Testando o componente Footer', () => {
  it('Verifica se o componente Footer é renderizado corretamente', () => {
    renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  it('Verifica se o icone de drinks redireciona para a página "/drinks"', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  it('Verifica se o icone de meals redireciona para a página "/meals"', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    fireEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});

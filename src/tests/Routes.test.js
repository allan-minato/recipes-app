import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import Profile from '../pages/Profile';

const pageTitleId = 'page-title';

describe('Testando o componente Meals', () => {
  it('Verifica se o componente Meals é renderizado', () => {
    renderWithRouter(<Meals />, {
      initialEntries: ['/meals'],
    });
    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Meals/i);

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica se o componente Drinks é renderizado', () => {
    renderWithRouter(<Drinks />, {
      initialEntries: ['/drinks'],
    });
    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Drinks/i);

    const searchButton = screen.getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Verifica se o componente FavoriteRecipes é renderizado', () => {
    renderWithRouter(<FavoriteRecipes />, {
      initialEntries: ['/favorite-recipes'],
    });
    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Favorite Recipes/i);
  });

  it('Verifica se o componente DoneRecipes é renderizado', () => {
    renderWithRouter(<DoneRecipes />, {
      initialEntries: ['/done-recipes'],
    });
    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Done Recipes/i);
  });

  it('Verifica se o componente Profile é renderizado', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@gmail.com' }));
    renderWithRouter(<Profile />, {
      initialEntries: ['/profile'],
    });
    const pageTitle = screen.getByTestId(pageTitleId);
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent(/Profile/i);
  });
});

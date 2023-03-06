import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { Router } from 'react-router-dom'; // <--- Adicione esta linha
import { createMemoryHistory } from 'history';
import { renderWithRouter } from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

const VALIDEMAIL = 'allan.minato@gmail.com';

describe('Testando o componente Profile', () => {
  it('Verifica se o componente Profile é renderizado', () => {
    localStorage.setItem('user', JSON.stringify({ email: VALIDEMAIL }));
    renderWithRouter(<Profile />);
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    const buttonRecipesDone = screen.getByTestId('profile-done-btn');
    expect(buttonRecipesDone).toBeInTheDocument();
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
  });
  it('Testa se é redirecionado ao clicar no botão "Done Recipes"', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: VALIDEMAIL }));
    renderWithRouter(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonRecipesDone = screen.getByTestId('profile-done-btn');
    const doneRecipesPage = '/done-recipes';
    fireEvent.click(buttonRecipesDone);
    expect(history.location.pathname).toBe(doneRecipesPage);
  });
  it('Testa se é redirecionado ao clicar no botão "Favorite Recipes"', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: VALIDEMAIL }));
    renderWithRouter(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const favoriteRecipesPage = '/favorite-recipes';
    fireEvent.click(buttonFavoriteRecipes);
    expect(history.location.pathname).toBe(favoriteRecipesPage);
  });
  it('Testa se é redirecionado ao clicar no botão "Logout"', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: VALIDEMAIL }));
    renderWithRouter(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    const LogoutPage = '/';
    fireEvent.click(buttonLogout);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe(LogoutPage);
  });
  it('Testa se Header está presente na página Profile', () => {
    const history = createMemoryHistory();
    localStorage.setItem('user', JSON.stringify({ email: VALIDEMAIL }));
    renderWithRouter(
      <Router history={ history }>
        <Profile />
      </Router>,
    );
    const headerProfile = screen.getByTestId('page-title');
    // const ProfilePage = '/Profile';
    expect(headerProfile).toBeInTheDocument();
    // fireEvent.click(headerProfile);
    // expect(history.location.pathname).toBe(ProfilePage);

    // const button = screen.getByTestId('login-submit-btn');
  });
});

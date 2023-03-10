import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testando o componente Login', () => {
  it('Verifica se o componente Login é renderizado', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
  });

  it('Testa se os inputs estão funcionando e se o botão está habilitado', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();

    const email = 'diego@gmail.com';
    userEvent.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
    expect(button).toBeDisabled();

    const password = '123456789';
    userEvent.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);
    expect(button).toBeEnabled();
    userEvent.click(button);

    expect(localStorage.getItem('user')).toEqual(JSON.stringify({ email }));
  });
});

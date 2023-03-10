import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile(tittle) {
  const history = useHistory();
  const userEmail = JSON.parse(localStorage.getItem('user'));
  console.log(userEmail);
  const logoutHandle = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header title="Profile" withSearchBar={ false } />
      <Header data-testid={ tittle } title="Profile" withSearchBar={ false } />
      <span
        data-testid="profile-email"
      >
        USER EMAIL:
        {' '}
        { userEmail.email }
      </span>
      <button
        data-testid="profile-done-btn"
        onClick={ () => {
          history.push('/done-recipes');
        } }
      >
        Done Recipes

      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => {
          history.push('/favorite-recipes');
        } }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ logoutHandle }
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;

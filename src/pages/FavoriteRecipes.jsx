import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" withSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

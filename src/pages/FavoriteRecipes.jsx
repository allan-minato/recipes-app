import React from 'react';
import Header from '../components/Header';
import FavoriteMeal from '../components/FavoriteMeal';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        withSearchBar={ false }
      />
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <FavoriteMeal index={ 0 } />
      <FavoriteMeal index={ 1 } />
      <FavoriteMeal index={ 2 } />
    </div>
  );
}

export default FavoriteRecipes;

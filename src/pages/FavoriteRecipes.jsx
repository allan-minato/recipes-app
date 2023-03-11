import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteMeal from '../components/FavoriteMeal';
import { favoritePromise } from '../services/favoriteHelpers';

function FavoriteRecipes() {
  const [favoriteArray, setfavoriteArray] = useState([]);
  const getRecipes = async () => {
    const promise = await favoritePromise();
    setfavoriteArray(promise);
  };

  useEffect(
    () => {
      getRecipes();
    },
    [favoriteArray],
  );

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
      {favoriteArray.map((recipes, index) => (
        recipes.type === 'meal'
          ? (
            <FavoriteMeal
              recipe={ recipes }
              index={ index }
              key={ index }
            />
          )
          : (
            <FavoriteMeal
              recipe={ recipes }
              index={ index }
              key={ index }
            />
          )
      ))}
    </div>
  );
}

export default FavoriteRecipes;

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import FavoriteMeal from '../components/FavoriteMeal';
import { favoritePromise } from '../services/favoriteHelpers';
import FavoriteDrink from '../components/FavoriteDrink';

function FavoriteRecipes() {
  const [favoriteArray, setfavoriteArray] = useState([]);

  const [favoriteFilters, setFavoriteFilters] = useState({
    all: true,
    meal: false,
    drink: false,
  });

  const handleFilter = (filter) => {
    const newFavoriteFilters = {
      all: false,
      meal: false,
      drink: false,
      [filter]: true,
    };
    setFavoriteFilters(newFavoriteFilters);
  };

  useEffect(() => {
    const getRecipes = async () => {
      const recipes = await favoritePromise();
      switch (true) {
      case favoriteFilters.all:
        setfavoriteArray(recipes);
        break;
      case favoriteFilters.meal:
        setfavoriteArray(recipes.filter((recipe) => recipe.type === 'meal'));
        break;
      case favoriteFilters.drink:
        setfavoriteArray(recipes.filter((recipe) => recipe.type === 'drink'));
        break;
      default:
        setfavoriteArray(recipes);
      }
    };
    getRecipes();
  }, [favoriteArray, favoriteFilters]);

  return (
    <div>
      <Header
        title="Favorite Recipes"
        withSearchBar={ false }
      />
      <button data-testid="filter-by-all-btn" onClick={ () => handleFilter('all') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => handleFilter('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => handleFilter('drink') }>
        Drinks
      </button>
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
            <FavoriteDrink
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

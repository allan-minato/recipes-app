import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function RenderRecipes() {
  const { apiResponse } = useContext(RecipesContext);
  const [showRecipes, setShowRecipes] = useState([]);

  const location = useLocation();
  const { pathname } = location;
  const key = pathname.split('/')[1];

  const intervalRecipes = (params) => {
    const skip = 12;
    const firstIndex = params * skip;
    const lastIndex = firstIndex + skip;
    const recipes = apiResponse[key].slice(firstIndex, lastIndex);
    setShowRecipes(recipes);
  };

  useEffect(() => {
    intervalRecipes(0);
  }, [apiResponse]);

  return (
    <div>
      {showRecipes.map((recipe, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            className="recipe-img"
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>
            {recipe.strMeal || recipe.strDrink}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RenderRecipes;

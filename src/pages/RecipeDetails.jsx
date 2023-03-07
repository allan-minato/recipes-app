import React from 'react';
import { useLocation } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import {
  getDrinkByID,
  getDrinksRecommendations,
  getMealByID,
  getMealsRecommendations,
} from '../services/fetchAPI';
import { treatObject } from '../services/treatObject';

function RecipeDetails() {
  const [, pathname, id] = useLocation().pathname.split('/');

  const {
    data: dataReceipe,
    isLoading,
    error,
  } = useFetch(pathname === 'meals' ? getMealByID : getDrinkByID, id);

  const { data: dataRecommendations } = useFetch(
    pathname === 'meals' ? getDrinksRecommendations : getMealsRecommendations,
  );

  const data = treatObject(dataReceipe, pathname);
  const {
    image,
    title,
    category,
    alcoholic,
    video,
    ingredients,
    measures,
    instructions,
  } = data;

  return isLoading ? (
    <p>Carregando...</p>
  ) : (
    <div>
      {error ? (
        <p>Erro</p>
      ) : (
        <div>
          <img
            src={ image }
            alt="Imagem da Receita"
            width="200"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{title}</h1>
          <p data-testid="recipe-category">
            Categorias:
            {' '}
            {category}
            {' '}
            {alcoholic}
          </p>
          <p data-testid="instructions">{instructions}</p>
          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            {ingredients && (
              <tbody>
                {ingredients.map((ingredient, index) => (
                  <tr
                    key={ ingredient }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    <td>{ingredient}</td>
                    <td>{measures[index] ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {video && (
            <iframe data-testid="video" title="Youtube Video" src={ video } />
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

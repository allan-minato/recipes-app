import React from 'react';
import { useLocation } from 'react-router-dom';

import Carousel from '../components/Carousel';
import useFetch from '../hooks/useFetch';
import {
  getDrinkByID,
  getDrinksRecommendations,
  getMealByID,
  getMealsRecommendations,
} from '../services/fetchAPI';
import { treatReceipeObject } from '../services/treatObject';
import styles from '../styles/pages/RecipeDetails.module.css';

function RecipeDetails() {
  const [, pathname, id] = useLocation().pathname.split('/');
  const isMeal = pathname === 'meals';

  const {
    data: dataReceipe,
    isLoading,
    error,
  } = useFetch(isMeal ? getMealByID : getDrinkByID, id);

  const { data: dataRecommendations } = useFetch(
    isMeal ? getDrinksRecommendations : getMealsRecommendations,
  );

  const data = treatReceipeObject(dataReceipe, pathname);
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
        <div className={ styles.mainContainer }>
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
          <div>
            <p>Recomendações: </p>
            <Carousel data={ dataRecommendations } pathname={ pathname } />
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

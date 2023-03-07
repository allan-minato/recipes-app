import React from 'react';
import { useLocation } from 'react-router-dom';
import Buttons from '../components/Buttons';

import Carousel from '../components/Carousel';
import Header from '../components/Header';

import useFetch from '../hooks/useFetch';
import { MEALS } from '../services/constTypes';
import {
  getDrinkByID,
  getDrinksRecommendations,
  getMealByID,
  getMealsRecommendations,
} from '../services/fetchAPI';
import { treatRecipeData } from '../services/treatObject';

import styles from '../styles/pages/RecipeDetails.module.css';

function RecipeDetails() {
  const [, pathname, id] = useLocation().pathname.split('/');
  const isMeal = pathname === MEALS;

  const {
    data: dataRecipe,
    isLoading,
    error,
  } = useFetch(isMeal ? getMealByID : getDrinkByID, id);

  const { data: dataRecommendations } = useFetch(
    isMeal ? getDrinksRecommendations : getMealsRecommendations,
  );

  const data = treatRecipeData(dataRecipe, pathname);

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
        <>
          <Header />
          <div className={ styles.mainContainer }>
            <img
              src={ image }
              alt="Imagem da Receita"
              width="200"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">{title}</h1>
            <p data-testid="recipe-category">
              Categories:
              {' '}
              {category}
              {' '}
              {alcoholic}
            </p>
            <p data-testid="instructions">{instructions}</p>
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
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
              <p>Recommendations: </p>
              <Carousel data={ dataRecommendations } pathname={ pathname } />
            </div>
          </div>
          <Buttons
            type="button"
            label="Start Recipe"
            dataTestid="start-recipe-btn"
            classN={ styles.btnRecipe }
          />
        </>
      )}
    </div>
  );
}

export default RecipeDetails;

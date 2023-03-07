import React from 'react';
import { useLocation } from 'react-router-dom';

import Buttons from '../components/Buttons';
import Carousel from '../components/Carousel';
import Header from '../components/Header';

import useFetch from '../hooks/useFetch';
import { DONE_RECIPES, MEALS } from '../services/constTypes';
import {
  getDrinkByID,
  getMealByID,
} from '../services/fetchAPI';
import { getFromLocalStorage } from '../services/localStorageHelpers';
import { treatRecipeData } from '../services/treatObject';

import styles from '../styles/pages/RecipeDetails.module.css';

function RecipeDetails() {
  const [, pathname, id] = useLocation().pathname.split('/');

  const {
    data: dataRecipe,
    isLoading,
    error,
  } = useFetch(pathname === MEALS ? getMealByID : getDrinkByID, id);

  const data = treatRecipeData(dataRecipe, pathname);
  const showButton = getFromLocalStorage(DONE_RECIPES).some(
    (key) => key.id === id,
  );

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

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        // <div>
        <div className={ styles.mainContainer }>
          {error ? (
            <p>Erro</p>
          ) : (
            <>
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
                <Carousel pathname={ pathname } />
              </div>
              {!showButton && (
                <Buttons
                  type="button"
                  label="Start Recipe"
                  dataTestid="start-recipe-btn"
                  classN={ styles.btnRecipe }
                />
              )}
            </>
          )}
        </div>
      )}
    </>

  );
}

export default RecipeDetails;

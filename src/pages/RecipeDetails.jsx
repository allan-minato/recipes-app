import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import copy from 'clipboard-copy';

import Buttons from '../components/Buttons';
import Carousel from '../components/Carousel';
import Header from '../components/Header';

import useFetch from '../hooks/useFetch';
import {
  DONE_RECIPES,
  DRINK,
  FAVORITE_RECIPES,
  IN_PROGRESS_RECIPES,
  MEAL,
  MEALS,
  ZERO,
} from '../services/constTypes';
import { getDrinkByID, getMealByID } from '../services/fetchAPI';
import {
  getFromLocalStorage,
  manageFavoriteInLocalStorage,
} from '../services/localStorageHelpers';
import { treatRecipeData } from '../services/treatObject';

import styles from '../styles/pages/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const [, pathname, id] = useLocation().pathname.split('/');
  const [isURLCopied, setisURLCopied] = useState(false);

  const {
    data: dataRecipe,
    isLoading,
    error,
  } = useFetch(pathname === MEALS ? getMealByID : getDrinkByID, id);

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
    strArea,
  } = data;

  const showButton = getFromLocalStorage(DONE_RECIPES).some(
    (key) => key.id === id,
  );

  const isRecipeInProgress = getFromLocalStorage(IN_PROGRESS_RECIPES).length !== ZERO
    && Object.keys(getFromLocalStorage(IN_PROGRESS_RECIPES)[pathname]).some(
      (key) => key === id,
    );

  const urlToClipboard = () => {
    copy(window.location.href);
    setisURLCopied(true);
  };

  const favoriteRecipe = () => {
    manageFavoriteInLocalStorage(FAVORITE_RECIPES, {
      id,
      type:
        pathname === MEALS
          ? MEAL.toLocaleLowerCase()
          : DRINK.toLocaleLowerCase(),
      nationality: strArea || '',
      category,
      alcoholicOrNot: alcoholic || '',
      name: title,
      image,
    });
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
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
                <Buttons
                  type="button"
                  dataTestid="share-btn"
                  icon={ shareIcon }
                  onClick={ urlToClipboard }
                />
                <Buttons
                  type="button"
                  label="Favorite Recipe"
                  dataTestid="favorite-btn"
                  onClick={ favoriteRecipe }
                />
              </div>
              {isURLCopied && (
                <div>
                  <p>Link copied!</p>
                </div>
              )}
              <div>
                <p>Recommendations: </p>
                <Carousel pathname={ pathname } />
              </div>
              {!showButton && (
                <Link to={ `/${pathname}/${id}/in-progress` }>
                  <Buttons
                    type="button"
                    label={
                      isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'
                    }
                    dataTestid="start-recipe-btn"
                    btnClass={ styles.btnRecipe }
                  />
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default RecipeDetails;

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Buttons from '../components/Buttons';
import Carousel from '../components/Carousel';
import Header from '../components/Header';

import useFetch from '../hooks/useFetch';
import { getDrinkByID, getMealByID } from '../services/fetchFunctions';
import {
  getFromLocalStorage,
  manageFavoritesInLocalStorage,
} from '../services/localStorageHelpers';

import styles from '../styles/pages/RecipeDetails.module.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import {
  DONE_RECIPES,
  DRINK,
  ERROR_MESSAGE,
  FAVORITE_BTN,
  FAVORITE_RECIPES,
  INSTRUCTIONS,
  IN_PROGRESS_RECIPES,
  MEAL,
  MEALS,
  RECIPE_CATEGORY,
  RECIPE_PHOTO,
  RECIPE_TITLE,
  SHARE_BTN,
  START_RECIPE_BTN,
  TWO_THOUSAND,
  VIDEO,
  ZERO,
} from '../services/constTypes';

function RecipeDetails() {
  const [isURLCopied, setIsURLCopied] = useState(false);
  const [recipeFavorite, setRecipeFavorite] = useState(false);

  const [, pathname, id] = useLocation().pathname.split('/');

  const {
    data: {
      image,
      title,
      category,
      alcoholic,
      video,
      ingredients,
      measures,
      instructions,
      strArea,
    },
    isLoading,
    error,
  } = useFetch(pathname === MEALS ? getMealByID : getDrinkByID, id);

  const showButton = getFromLocalStorage(DONE_RECIPES).some(
    (key) => key.id === id,
  );

  const isRecipeInProgress = getFromLocalStorage(IN_PROGRESS_RECIPES).length !== ZERO
    && Object.keys(getFromLocalStorage(IN_PROGRESS_RECIPES)[pathname]).some(
      (key) => key === id,
    );

  console.log(isRecipeInProgress);

  const isFavorite = useCallback(
    () => getFromLocalStorage(FAVORITE_RECIPES).some((recipe) => recipe.id === id),
    [id],
  );

  useEffect(() => {
    setRecipeFavorite(isFavorite);
  }, [isFavorite]);

  const favoriteRecipe = () => {
    manageFavoritesInLocalStorage(FAVORITE_RECIPES, {
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
    setRecipeFavorite(isFavorite);
  };

  const urlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsURLCopied(true);
    setTimeout(() => {
      setIsURLCopied(false);
    }, TWO_THOUSAND);
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className={ styles.mainContainer }>
          {error ? (
            <p data-testid={ ERROR_MESSAGE }>Erro</p>
          ) : (
            <>
              <img
                src={ image }
                alt="Imagem da Receita"
                width="200"
                data-testid={ RECIPE_PHOTO }
              />
              <h1 data-testid={ RECIPE_TITLE }>{title}</h1>
              <p data-testid={ RECIPE_CATEGORY }>
                Categories:
                {' '}
                {category}
                {' '}
                {alcoholic}
              </p>
              <p data-testid={ INSTRUCTIONS }>{instructions}</p>
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
                <iframe data-testid={ VIDEO } title="Youtube Video" src={ video } />
              )}
              <div>
                <Buttons
                  type="button"
                  dataTestid={ SHARE_BTN }
                  icon={ shareIcon }
                  onClick={ urlToClipboard }
                />
                <Buttons
                  type="button"
                  dataTestid={ FAVORITE_BTN }
                  icon={ recipeFavorite ? blackHeartIcon : whiteHeartIcon }
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
                    labelText={
                      isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'
                    }
                    dataTestid={ START_RECIPE_BTN }
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

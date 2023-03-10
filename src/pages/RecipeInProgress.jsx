import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import {
  DRINK,
  ERROR_MESSAGE,
  FAVORITE_BTN,
  FAVORITE_RECIPES,
  FINISH_RECIPE_BTN,
  INSTRUCTIONS,
  MEAL,
  MEALS,
  RECIPE_CATEGORY,
  RECIPE_PHOTO,
  RECIPE_TITLE,
  SHARE_BTN,
} from '../services/constTypes';
import { getDrinkByID, getMealByID } from '../services/fetchFunctions';
import {
  getFromLocalStorage,
  manageFavoritesInLocalStorage,
} from '../services/localStorageHelpers';

import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Inputs from '../components/Inputs';

function RecipeInProgress() {
  const [, pathname, id] = useLocation().pathname.split('/');
  const [recipeFavorite, setRecipeFavorite] = useState(false);
  const [isURLCopied, setIsURLCopied] = useState(false);

  const {
    data: {
      image,
      title,
      category,
      alcoholic,
      ingredients,
      measures,
      instructions,
      strArea,
    },
    isLoading,
    error,
  } = useFetch(pathname === MEALS ? getMealByID : getDrinkByID, id);

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

  const [completed, setCompleted] = useState([]);

  const includes = (item) => {
    const exist = completed.includes(item);
    return exist ? 'risco' : '';
  };

  const lineThrough = ({ target: { checked, name } }) => {
    if (checked) {
      setCompleted([...completed, name]);
      return;
    }
    setCompleted(completed.filter((item) => item !== name));
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
        <div>
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
              <div>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={ ingredient }
                      data-testid={ `${index}-ingredient-step` }
                      className={ includes(`${ingredient}-${index}`) }
                    >
                      <Inputs
                        type="checkbox"
                        labelText={ `${ingredient} - ${measures[index]}` }
                        nameClass={ includes(`${ingredient}-${index}`) }
                        onChange={ lineThrough }
                        name={ `${ingredient}-${index}` }
                      />
                    </li>
                  ))}
                </ul>
              </div>
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
              <Buttons dataTestid={ FINISH_RECIPE_BTN } />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default RecipeInProgress;

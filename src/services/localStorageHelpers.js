import { DONE_RECIPES, IN_PROGRESS_RECIPES, ZERO } from './constTypes';

export const getFromLocalStorage = (key, isObject = true) => (isObject
  ? JSON.parse(localStorage.getItem(key) ?? '[]')
  : localStorage.getItem(key));

export const manageFavoritesInLocalStorage = (key, value) => {
  const data = JSON.parse(localStorage.getItem(key) ?? '[]');
  if (!data.some((obj) => obj.id === value.id)) {
    localStorage.setItem(key, JSON.stringify([...data, value]));
  } else {
    localStorage.setItem(
      key,
      JSON.stringify(data.filter((recipe) => recipe.id !== value.id)),
    );
  }
};

export const removeFavoriteFromLocalStorage = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key) ?? '[]');
  if (data.some((obj) => obj.id === id)) {
    localStorage.setItem(
      key,
      JSON.stringify(data.filter((recipe) => recipe.id !== id)),
    );
  }
};

export const setInProgressToLocalStorage = (value, pathname, id) => {
  const data = getFromLocalStorage(IN_PROGRESS_RECIPES).length === ZERO
    ? {}
    : getFromLocalStorage(IN_PROGRESS_RECIPES);
  data[pathname] = { ...data[pathname], [id]: value };
  localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(data));
};

export const setDoneRecipeInLocalStorage = (value) => {
  const data = getFromLocalStorage(DONE_RECIPES);
  if (!data.some((obj) => obj.id === value.id)) {
    localStorage.setItem(DONE_RECIPES, JSON.stringify([...data, value]));
  }
};

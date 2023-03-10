import apiFetch from '../helpers/apiFetch';
import { treatRecipeData, treatRecommendationsData } from './treatObject';

import { DRINK, MEAL } from './constTypes';

export const getDrinkByID = async (id) => {
  const { drinks } = await apiFetch('thecocktaildb', `lookup.php?i=${id}`);
  return treatRecipeData(drinks[0], DRINK);
};

export const getMealByID = async (id) => {
  const { meals } = await apiFetch('themealdb', `lookup.php?i=${id}`);
  return treatRecipeData(meals[0], MEAL);
};

export const getDrinksRecommendations = async () => {
  const { drinks } = await apiFetch('thecocktaildb', 'search.php?s=');
  return treatRecommendationsData(drinks, DRINK);
};

export const getMealsRecommendations = async () => {
  const { meals } = await apiFetch('themealdb', 'search.php?s=');
  return treatRecommendationsData(meals, MEAL);
};

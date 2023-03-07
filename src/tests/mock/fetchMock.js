import oneMeal from '../../../cypress/mocks/oneMeal';
import oneDrink from '../../../cypress/mocks/oneDrink';
import meals from '../../../cypress/mocks/meals';
import drinks from '../../../cypress/mocks/drinks';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import emptyMeals from '../../../cypress/mocks/emptyMeals';

const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';
const MEALS = 'https://www.themealdb.com/api/json/v1/1/';

const fetchMock = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === `${DRINKS}search.php?s=Aquamarine`) {
      return Promise.resolve(oneDrink);
    }

    if (url === `${MEALS}search.php?s=Spicy Arrabiata Penne`) {
      return Promise.resolve(oneMeal);
    }

    if (url === `${DRINKS}search.php?s=`) {
      return Promise.resolve(drinks);
    }

    if (url === `${MEALS}search.php?s=`) {
      return Promise.resolve(meals);
    }

    if (url === `${MEALS}filter.php?i=chicken`) {
      return Promise.resolve(mealsByIngredient);
    }

    if (url === `${MEALS}search.php?s=xablau`) {
      return Promise.resolve(emptyMeals);
    }
  },
});

export default fetchMock;

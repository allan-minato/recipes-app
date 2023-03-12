const delayedResponse = (response) => (callback) => {
  const timeout = 500;
  setTimeout(() => {
    callback(response);
  }, timeout);
};

const getFavoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

localStorage.setItem('favoriteRecipes', JSON.stringify(getFavoriteRecipe));

const readFavoriteRecipe = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

const writeFavoriteRecipe = (favoriteRecipes) => localStorage
  .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

export const favoritePromise = () => new Promise((resolve) => {
  const favoriteStorage = readFavoriteRecipe();
  delayedResponse(favoriteStorage)(resolve);
});

export const disfavor = (recipe) => new Promise((resolve) => {
  const currentFavoriteRecipes = readFavoriteRecipe();
  const favoriteRecipes = currentFavoriteRecipes.filter(
    (each) => each.id !== recipe.id,
  );
  writeFavoriteRecipe(favoriteRecipes);
  delayedResponse()(resolve);
});

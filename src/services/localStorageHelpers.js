export const getFromLocalStorage = (key, isObject = true) => (isObject
  ? JSON.parse(localStorage.getItem(key) ?? '[]')
  : localStorage.getItem(key));

export const manageFavoriteInLocalStorage = (key, value) => {
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

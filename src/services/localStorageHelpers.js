export const getFromLocalStorage = (key, isObject = true) => (isObject
  ? JSON.parse(localStorage.getItem(key) ?? '[{}]')
  : localStorage.getItem(key));

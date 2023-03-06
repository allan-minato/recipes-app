import { ONE, ONE_NEGATIVE, THIRTY_TWO, ZERO } from './constTypes';

export const treatObject = (obj, receipeType) => {
  const type = receipeType.slice(ZERO, ONE).toUpperCase()
    + receipeType.slice(ONE, ONE_NEGATIVE);

  const treatedObject = {};

  const treatedArray = [
    ['ingredients', []],
    ['measures', []],
    ...Object.entries(obj).map((info) => {
      switch (info[ZERO]) {
      case `str${type}Thumb`:
        return ['image', info[ONE]];
      case `str${type}`:
        return ['title', info[ONE]];
      case 'strCategory':
        return ['category', info[ONE]];
      case 'strAlcoholic':
        return ['alcoholic', info[ONE]];
      case 'strInstructions':
        return ['instructions', info[ONE]];
      case 'strYoutube':
        return ['video', `https://www.youtube.com/embed/${info[ONE].slice(THIRTY_TWO)}`];
      default:
        return info;
      }
    }).filter((info) => {
      if (info[ZERO].includes('strIngredient')) { return info[ONE]; }
      return info;
    }),
  ];

  treatedArray.forEach((info) => {
    if (info[ZERO].includes('strIngredient')) {
      treatedObject.ingredients = [...treatedObject.ingredients, info[ONE]];
      return;
    }
    if (info[ZERO].includes('strMeasure')) {
      treatedObject.measures = [...treatedObject.measures, info[ONE]];
      return;
    }
    treatedObject[`${info[ZERO]}`] = `${info[ONE]}`;
  });

  return treatedObject;
};

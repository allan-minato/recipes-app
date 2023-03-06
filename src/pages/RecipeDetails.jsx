import React from 'react';
import { useLocation } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import { ONE, TWO } from '../services/constTypes';
import { getDrinkByID, getMealByID } from '../services/fetchAPI';
import { treatObject } from '../services/treatObject';

function RecipeDetails() {
  const param = useLocation().pathname.split('/');

  const {
    data: dataAPI,
    isLoading,
    error,
  } = useFetch(param[ONE] === 'meals' ? getMealByID : getDrinkByID, param[TWO]);

  const data = treatObject(dataAPI, param[ONE]);
  const {
    image,
    title,
    category,
    alcoholic,
    video,
    ingredients,
    measures,
    instructions,
  } = data;
  console.log(video);

  return isLoading ? (
    <p>Carregando...</p>
  ) : (
    <div>
      {error ? (
        <p>Erro</p>
      ) : (
        <div>
          <img
            src={ image }
            alt="Imagem da Receita"
            width="200"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{title}</h1>
          <p data-testid="recipe-category">
            Categorias:
            {' '}
            {category}
            {' '}
            {alcoholic}
          </p>
          <p data-testid="instructions">{instructions}</p>
          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Quantidade</th>
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
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;

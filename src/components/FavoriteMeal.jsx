import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteMeal({ index }) {
  const recipeTag = 'Pasta';
  const recipeTagTwo = 'Penne';
  const [mensage, setMensage] = useState(false);

  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText('http://localhost:3000/meals/52771');
      console.log('Receita copiada com sucesso!');
      setMensage(true);
    } catch (error) {
      console.error('Erro ao copiar a receita!', error);
    }
  };

  return (
    <div>
      <img alt="foodpicture" src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" data-testid={ `${index}-horizontal-image` } />
      <h3 data-testid={ `${index}-horizontal-name` }>Spicy Arrabiata Penne</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>Italian - Vegetarian</p>
      <p data-testid={ `${index}-horizontal-done-date` }>23/06/2020</p>
      <button data-testid={ `${index}-horizontal-share-btn` } onClick={ shareRecipe }>
        <img
          src={ shareIcon }
          alt="Share icon"
        />
      </button>
      {mensage && <p>Link copied!</p>}
      <p data-testid={ `${index}-${recipeTag}-horizontal-tag` }>{recipeTag}</p>
      <p data-testid={ `${index}-${recipeTagTwo}-horizontal-tag` }>{recipeTagTwo}</p>
      <button data-testid={ `${index}-horizontal-favorite-btn` }>
        <img
          src={ blackHeartIcon }
          alt="Black heart icon"
        />
      </button>
    </div>
  );
}

FavoriteMeal.propTypes = {
  index: PropTypes.number,
}.isRequired;

export default FavoriteMeal;

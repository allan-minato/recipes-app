import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { disfavor } from '../services/favoriteHelpers';

function FavoriteMeal({ recipe, index = 0 }) {
  const [mensage, setMensage] = useState(false);

  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText('http://localhost:3000/meals/52771');
    } catch (error) {
      console.error(error);
    }
    setMensage(true);
  };

  const remove = async () => {
    await disfavor(recipe);
  };

  return (
    <div>
      <img
        alt="foodpicture"
        src={ recipe.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.nationality} - ${recipe.category}`}
      </p>
      <button
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ shareRecipe }
      >
        <img
          src={ shareIcon }
          alt="Share icon"
        />
      </button>
      {mensage && <p>Link copied!</p>}
      <button
        src={ blackHeartIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ remove }
      >
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
  recipe: PropTypes.shape({
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteMeal;

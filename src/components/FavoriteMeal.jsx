import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { disfavor } from '../services/favoriteHelpers';

function FavoriteMeal({ recipe, index = 0 }) {
  const [mensage, setMensage] = useState(false);

  const currentType = 'meal';

  const route = currentType.includes(recipe.type.toLowerCase()) ? '/meals' : '/drinks';

  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000${route}/${recipe.id}`);
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
      <div>
        <Link to={ `${route}/${recipe.id}` } style={ { textDecoration: 'none' } }>
          <img
            alt="foodpicture"
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
          />
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        </Link>
      </div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.nationality} - ${recipe.category}`}
      </p>
      <button
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ shareRecipe }
      >
        <img src={ shareIcon } alt="Share icon" />
      </button>
      {mensage && <p>Link copied!</p>}
      <button
        src={ blackHeartIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ remove }
      >
        <img src={ blackHeartIcon } alt="Black heart icon" />
      </button>
    </div>
  );
}

FavoriteMeal.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteMeal;

import PropTypes from 'prop-types';
import React from 'react';

import useFetch from '../hooks/useFetch';
import {
  getDrinksRecommendations,
  getMealsRecommendations,
} from '../services/fetchFunctions';

import styles from '../styles/components/Carousel.module.css';

import { MEALS, SIX } from '../services/constTypes';

function Carousel({ pathname }) {
  const { data, isLoading } = useFetch(
    pathname === MEALS ? getDrinksRecommendations : getMealsRecommendations,
  );

  return (
    <div className={ styles.carouselContainer }>
      {!isLoading && data.map((recommendation, index) => (
        index < SIX && (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className={ styles.carouselCard }
          >
            <img src={ recommendation.image } alt={ recommendation.title } />
            <p data-testid={ `${index}-recommendation-title` }>
              {recommendation.title}
            </p>
          </div>
        )
      ))}
    </div>
  );
}

Carousel.propTypes = {
  pathname: PropTypes.string,
}.isRequired;

export default Carousel;

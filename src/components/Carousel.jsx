import PropTypes from 'prop-types';
import React from 'react';

import useFetch from '../hooks/useFetch';
import { MEALS, SIX } from '../services/constTypes';
import { getDrinksRecommendations, getMealsRecommendations } from '../services/fetchAPI';
import { treatRecommendationsData } from '../services/treatObject';

import styles from '../styles/components/Carousel.module.css';

function Carousel({ pathname }) {
  const { data } = useFetch(
    pathname === MEALS ? getDrinksRecommendations : getMealsRecommendations,
  );

  const dataRecommendations = treatRecommendationsData(data, pathname);

  return (
    <div className={ styles.carouselContainer }>
      {dataRecommendations.map((recommendation, index) => (
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
  data: PropTypes.shape([]),
  pathname: PropTypes.string,
}.isRequired;

export default Carousel;

import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const footerStyle = {
  bottom: '0',
  position: 'fixed',
};

function Footer() {
  const history = useHistory();

  const hendleDrinkIcon = () => {
    history.push('/drinks');
  };

  const hendleMealIcon = () => {
    history.push('/meals');
  };

  return (
    <footer data-testid="footer" style={ footerStyle }>
      <button onClick={ hendleDrinkIcon }>
        <img src={ drinkIcon } alt="drink-icon" data-testid="drinks-bottom-btn" />
      </button>
      <button onClick={ hendleMealIcon }>
        <img src={ mealIcon } alt="meal-icon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;

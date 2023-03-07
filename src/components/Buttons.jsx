import PropTypes from 'prop-types';
import React from 'react';

function Buttons({ type, dataTestid, disabled, label, onClick, classN }) {
  return (
    <button
      type={ type }
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
      className={ classN }
    >
      { label }
    </button>
  );
}

Buttons.propTypes = {
  dataTestid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Buttons;

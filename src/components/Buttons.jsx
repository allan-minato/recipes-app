import PropTypes from 'prop-types';
import React from 'react';

function Buttons({ type, dataTestid, disabled }) {
  return (
    <input
      type={ type }
      data-testid={ dataTestid }
      disabled={ disabled }
    />
  );
}

Buttons.propTypes = {
  dataTestid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Buttons;

import PropTypes from 'prop-types';
import React from 'react';

function Inputs({ type, dataTestid, onChange, name }) {
  return (
    <input
      type={ type }
      name={ name }
      data-testid={ dataTestid }
      onChange={ onChange }
    />
  );
}

Inputs.propTypes = {
  dataTestid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Inputs;

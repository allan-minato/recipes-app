import PropTypes from 'prop-types';
import React from 'react';

function Inputs({ type, dataTestid, onChange, name, value, labelText }) {
  return (
    <>

      <input
        type={ type }
        name={ name }
        data-testid={ dataTestid }
        onChange={ onChange }
        value={ value }
        id={ dataTestid }
      />
      {labelText && <label htmlFor={ dataTestid }>{labelText}</label>}
    </>
  );
}

Inputs.propTypes = {
  dataTestid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Inputs;

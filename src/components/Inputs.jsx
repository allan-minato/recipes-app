import PropTypes from 'prop-types';
import React from 'react';

function Inputs({
  type,
  dataTestid,
  onChange,
  name,
  value,
  labelText,
  nameClass,
  checked = false,
  placeholder,
}) {
  return (
    <>
      <input
        type={ type }
        name={ name }
        data-testid={ dataTestid }
        onChange={ onChange }
        checked={ type !== 'radio' ? checked : null }
        value={ value }
        id={ dataTestid }
        placeholder={ placeholder }
      />
      {labelText && (
        <label htmlFor={ dataTestid } className={ nameClass }>
          {labelText}
        </label>
      )}
    </>
  );
}

Inputs.propTypes = {
  dataTestid: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Inputs;

import PropTypes from 'prop-types';
import React from 'react';

function Buttons({
  type,
  name,
  dataTestid,
  isDisabled = false,
  labelText,
  onClick,
  btnClass,
  icon,
}) {
  return (
    <button
      key={ labelText }
      type={ type }
      data-testid={ dataTestid }
      disabled={ isDisabled }
      onClick={ onClick }
      className={ btnClass }
      src={ icon }
      name={ name }
    >
      {icon && <img src={ icon } alt="Button Icon" />}
      {labelText}
    </button>
  );
}

Buttons.propTypes = {
  btnClass: PropTypes.string,
  dataTestid: PropTypes.string,
  disabled: PropTypes.string,
  icon: PropTypes.string,
  labelText: PropTypes.string,
  onClick: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Buttons;

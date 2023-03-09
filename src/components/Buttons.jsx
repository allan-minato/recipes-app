import PropTypes from 'prop-types';
import React from 'react';

function Buttons({ type, dataTestid, disabled, label, onClick, btnClass, icon }) {
  return (
    <button
      type={ type }
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
      className={ btnClass }
      src={ icon }
    >
      {icon
        && <img src={ icon } alt="Button Icon" />}
      { label }
    </button>
  );
}

Buttons.propTypes = {
  btnClass: PropTypes.string,
  dataTestid: PropTypes.string,
  disabled: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

export default Buttons;

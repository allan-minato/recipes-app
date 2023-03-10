import PropTypes from 'prop-types';
import React from 'react';

function Buttons({ type, dataTestid, disabled, labelText, onClick, btnClass, icon }) {
  return (
    <button
      key={ labelText }
      type={ type }
      data-testid={ dataTestid }
      disabled={ disabled }
      onClick={ onClick }
      className={ btnClass }
      src={ icon }
    >
      {icon
        && <img src={ icon } alt="Button Icon" />}
      { labelText }
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

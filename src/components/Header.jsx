import PropTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, withProfileIcon = true, withSearchBar = true }) {
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      {withProfileIcon && (
        <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />)}

      {withSearchBar
      && (
        <div>
          <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  withProfileIcon: PropTypes.bool,
  withSearchBar: PropTypes.bool,
}.isRequired;

export default Header;

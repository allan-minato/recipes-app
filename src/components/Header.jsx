import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, withProfileIcon = true, withSearchBar = true }) {
  const profileLink = '/profile';
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      {withProfileIcon && (
        <Link to={ profileLink }>
          <img
            src={ profileIcon }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
      )}

      {withSearchBar
      && (
        <div>
          <button onClick={ handleClick }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>
          {showSearchBar && <SearchBar />}
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

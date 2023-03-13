import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/components/Header.sass';
import logo from '../assets/svg/smallLogo.svg';

function Header({ title, withProfileIcon = true, withSearchBar = true }) {
  const profileLink = '/profile';
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <div className="headerContainer">
        <Link to="/meals" className="imgContainer">

          <img src={ logo } alt="logo" />
          <p>
            Recipes
            {' '}
            <span>app</span>
          </p>

        </Link>
        <div className="profileContainer">
          <h1 data-testid="page-title" className="page-title">{title}</h1>
          {withSearchBar
      && (
        <div>
          <button onClick={ handleClick }>
            <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
          </button>

        </div>
      )}

          {withProfileIcon && (
            <Link to={ profileLink }>
              <img
                src={ profileIcon }
                alt="profileIcon"
                data-testid="profile-top-btn"
              />
            </Link>
          )}
        </div>
      </div>
      {showSearchBar && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  withProfileIcon: PropTypes.bool,
  withSearchBar: PropTypes.bool,
}.isRequired;

export default Header;

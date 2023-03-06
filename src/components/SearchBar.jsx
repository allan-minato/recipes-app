import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Buttons from './Buttons';
import Inputs from './Inputs';
import apiFetch from '../helpers/apiFetch';

function SearchBar() {
  const [searchInfo, setSearchInfo] = useState({
    searchInput: '',
    searchRadio: '',
  });
  const [pageLocation, setPageLocation] = useState('');

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === '/meals') setPageLocation('themealdb');
    if (pathname === '/drinks') setPageLocation('thecocktaildb');
    return () => setPageLocation('');
  }, []);

  const { searchInput, searchRadio } = searchInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const getEndpoint = () => {
    const endpoint = {
      ingredient: 'filter.php?i=',
      name: 'search.php?s=',
      firstLetter: 'search.php?f=',
    };

    if (searchInput.length > 1 && searchRadio === 'firstLetter') {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }

    const fullEndPoint = `${endpoint[searchRadio]}${searchInput}`;
    if (searchInput && searchRadio) return fullEndPoint;
  };

  const apiCall = async (endpoint) => {
    const response = await apiFetch(pageLocation, endpoint);
    console.log(response);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = getEndpoint();

    if (!endpoint) return;

    apiCall(endpoint);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <Inputs
          type="text"
          dataTestid="search-input"
          name="searchInput"
          value={ searchInput }
          onChange={ handleChange }
        />
        <Inputs
          type="radio"
          dataTestid="ingredient-search-radio"
          name="searchRadio"
          value="ingredient"
          labelText="Ingrediente"
          onChange={ handleChange }
        />
        <Inputs
          type="radio"
          dataTestid="name-search-radio"
          name="searchRadio"
          value="name"
          labelText="Nome"
          onChange={ handleChange }
        />
        <Inputs
          type="radio"
          dataTestid="first-letter-search-radio"
          name="searchRadio"
          value="firstLetter"
          labelText="Primeira letra"
          onChange={ handleChange }
        />
        <Buttons
          type="submit"
          dataTestid="exec-search-btn"
          onChange={ handleChange }
        />
      </form>
    </div>
  );
}

export default SearchBar;

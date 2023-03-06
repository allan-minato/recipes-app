import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Buttons from './Buttons';
import Inputs from './Inputs';
import apiFetch from '../helpers/apiFetch';
import RecipesContext from '../context/recipesContext';

function SearchBar() {
  const [searchInfo, setSearchInfo] = useState({
    searchInput: '',
    searchRadio: '',
  });
  const { apiResponse, setApiResponse } = useContext(RecipesContext);
  const [apiType, setApiType] = useState('');

  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split('/')[1];

  const history = useHistory();

  useEffect(() => {
    if (page === 'meals') setApiType('themealdb');
    if (page === 'drinks') setApiType('thecocktaildb');
    return () => setApiType('');
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
    const response = await apiFetch(apiType, endpoint);
    return response;
  };

  const handleRedirect = (response) => {
    if (response.length === 1) {
      const firstOfArray = response[0];
      const id = firstOfArray.idMeal || firstOfArray.idDrink;
      history.push(`/${page}/${id}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = getEndpoint();

    if (!endpoint) return;

    const response = await apiCall(endpoint);

    if (response[page] === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (response[page]) {
      setApiResponse({
        ...apiResponse,
        [page]: response[page],
      });
      handleRedirect(response[page]);
    }
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
          labelText="Enviar"
        />
      </form>
    </div>
  );
}

export default SearchBar;

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CategoriesFilter from '../components/CategoriesFilter';
import RenderRecipes from '../components/RenderRecipes';
import RecipesContext from '../context/recipesContext';

function Recipes() {
  const { apiResponse, setApiResponse, setFilteredRecipes } = useContext(RecipesContext);
  const [apiType, setApiType] = useState('');

  const location = useLocation();
  const { pathname } = location;
  const pageName = pathname.split('/')[1];

  const fetchRecipes = async () => {
    const url = `https://www.${apiType}.com/api/json/v1/1/search.php?s=`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const setContext = async () => {
    const fetchResponse = await fetchRecipes();
    const api = {
      ...apiResponse,
      [pageName]: fetchResponse[pageName],
    };
    setApiResponse(api);
    setFilteredRecipes(api);
  };

  useEffect(() => {
    if (pageName === 'meals') {
      setApiType('themealdb');
    }
    if (pageName === 'drinks') {
      setApiType('thecocktaildb');
    }
  }, []);

  useEffect(() => {
    if (apiType) setContext();
  }, [apiType]);

  const render = apiResponse[pageName] && apiType;

  return (
    <div>
      {render && (
        <>
          <CategoriesFilter apiType={ apiType } pageName={ pageName } />
          <RenderRecipes />
        </>
      )}
    </div>
  );
}

export default Recipes;
